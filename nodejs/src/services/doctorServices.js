import { where } from "sequelize";
import db from "../models"
require('dotenv').config();
import _ from 'lodash';

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE || 10;

let getTopDoctorHome = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                limit: limit,
                where: { roleId: 'R2' },
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] }
                ],
                raw: false,
                nest: true
            });

            resolve({
                errCode: 0,
                errMessage: 'OK',
                data: doctors
            });
        } catch (e) {
            reject(e);
        }
    })
}

let getAllDoctor = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                where: { roleId: 'R2' },
                attributes: {
                    exclude: ['password', 'image']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] }
                ],
                raw: false,
                nest: true
            });

            resolve({
                errCode: 0,
                errMessage: 'OK',
                data: doctors
            });
        } catch (e) {
            reject(e);
        }
    })
}

let saveInfoDoctor = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.contentMarkdown || !data.contentHTML || !data.actions || !data.doctorId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                });
            } else {
                if (data.actions === "CREATE") {
                    await db.Markdown.create({
                        contentMarkdown: data.contentMarkdown,
                        contentHTML: data.contentHTML,
                        description: data.description,
                        doctorId: data.doctorId
                    });
                } else if (data.actions === 'EDIT') {
                    let doctorMarkdown = await db.Markdown.findOne({
                        where: { doctorId: data.doctorId },
                        raw: false
                    });

                    if (doctorMarkdown) {
                        doctorMarkdown.contentMarkdown = data.contentMarkdown;
                        doctorMarkdown.contentHTML = data.contentHTML;
                        doctorMarkdown.description = data.description;
                        await doctorMarkdown.save();
                    }
                }
                resolve({
                    errCode: 0,
                    errMessage: 'Save info doctor successfully'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getDetailDoctor = (doctorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                });
            } else {
                let doctor = await db.User.findOne({
                    where: { id: doctorId },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        { model: db.Markdown, as: 'markdownData', attributes: ['contentMarkdown', 'contentHTML', 'description'] },
                        { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    ],
                    raw: true,
                    nest: true
                });
                if (doctor && doctor.image) {
                    doctor.image = Buffer.from(doctor.image, 'base64').toString('binary');
                }
                if (!doctor) {
                    doctor = {};
                }
                resolve({
                    errCode: 0,
                    errMessage: 'OK',
                    data: doctor
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let bulkCreateSchedule = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.doctorId || !data.date || !Array.isArray(data.time)) {
                return resolve({
                    errCode: 1,
                    errMessage: 'Missing or invalid required parameters'
                });
            }

            // Lấy lịch đã tồn tại
            let existingSchedules = await db.Schedule.findAll({
                where: {
                    doctorId: data.doctorId,
                    date: data.date
                },
                attributes: ['id', 'timeType', 'date', 'doctorId', 'maxNumber', 'currentNumber'],
                raw: true
            });
            
            if(existingSchedules && existingSchedules.length > 0 ) {
                existingSchedules = existingSchedules.map(item => {
                    item.date = new Date(item.date).getTime();
                    return item;
                })
            }
            console.log("Check existingSchedules: ", existingSchedules);

            // Format dữ liệu mới
            let formattedNew = data.time.map(item => ({
                doctorId: data.doctorId,
                date: data.date,
                timeType: item.timeType || item,
                maxNumber: item.maxNumber || 10
            }));
            console.log("Check formattedNew: ", formattedNew);
            

            // Danh sách cần insert và update
            let schedulesToCreate = [];
            let schedulesToUpdate = [];

            for (let schedule of formattedNew) {
                let match = existingSchedules.find(existing =>
                    existing.timeType === schedule.timeType &&
                    existing.date === schedule.date &&
                    existing.doctorId === schedule.doctorId
                );
                

                if (!match) {
                    // Chưa tồn tại → tạo mới
                    schedulesToCreate.push({
                        ...schedule,
                        currentNumber: 1
                    });
                } else {
                    if (match.currentNumber >= match.maxNumber) {
                        return resolve({
                            errCode: 2,
                            errMessage: `Time slot '${schedule.timeType}' is fully booked`
                        });
                    } else {
                        // Tăng currentNumber lên 1
                        schedulesToUpdate.push({
                            id: match.id,
                            currentNumber: match.currentNumber + 1
                        });
                    }
                }
            }

            // Tạo mới
            if (schedulesToCreate.length > 0) {
                await db.Schedule.bulkCreate(schedulesToCreate);
            }

            // Cập nhật currentNumber
            for (let item of schedulesToUpdate) {
                await db.Schedule.update(
                    { currentNumber: item.currentNumber },
                    { where: { id: item.id } }
                );
            }

            return resolve({    
                errCode: 0,
                errMessage: 'Create/update schedule successfully'
            });

        } catch (e) {
            reject(e);
        }
    });
};

let getDoctorSchedule = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("Check data: ", data);
            
            if(!data.doctorId || !data.date) {
                return resolve({
                    errCode: 1,
                    errMessage: 'Missing or invalid required parameters'
                });
            } else {
                let formattedDate = Number(data.date);
                let doctorSchedule = await db.Schedule.findAll({
                    where: {
                        doctorId: data.doctorId,
                        date: formattedDate
                    },
                    attributes: ['currentNumber','maxNumber','date','timeType','doctorId']
                })
                
                resolve({
                    errCode: 0,
                    errMessage: 'OK',
                    data: doctorSchedule
                });
            }
        } catch (e) {
            reject(e)
        }
    })
}



module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctor: getAllDoctor,
    saveInfoDoctor: saveInfoDoctor,
    getDetailDoctor: getDetailDoctor,
    bulkCreateSchedule: bulkCreateSchedule,
    getDoctorSchedule: getDoctorSchedule
}