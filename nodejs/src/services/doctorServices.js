import { where } from "sequelize";
import db from "../models"
require('dotenv').config();
import _, { includes } from 'lodash';

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

            let schedule = data.time.map(item => ({
                doctorId: data.doctorId,
                date: data.date,
                timeType: item.timeType,
                maxNumber: item.maxNumber || MAX_NUMBER_SCHEDULE
            }));

            // Get all existing data
            let existing = await db.Schedule.findAll({
                where: {
                    doctorId: data.doctorId,
                    date: data.date
                },
                attributes: ['timeType', 'date', 'doctorId', 'maxNumber'],
                raw: true
            });

            // Compare difference
            let toCreate = _.differenceWith(schedule, existing, (a, b) => {
                return a.timeType === b.timeType && a.date === b.date;
            });

            // Create data
            if (toCreate && toCreate.length > 0) {
                await db.Schedule.bulkCreate(toCreate);
            }

            resolve({
                errCode: 0,
                errMessage: 'Ok',
            });

        } catch (e) {
            reject(e);
        }
    });
};

let getDoctorSchedule = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.doctorId || !data.date) {
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
                    attributes: ['currentNumber', 'maxNumber', 'date', 'timeType', 'doctorId'],
                    include: [
                        {
                            model: db.Allcode,
                            as: 'timeTypeData',
                            attributes: ['valueEn', 'valueVi'],
                        }
                    ],
                    raw:false,
                    nest:true
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