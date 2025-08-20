import { where } from "sequelize";
import db from "../models"
require('dotenv').config();
import _, { add, includes } from 'lodash';

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

let saveInfoDoctor = async (data) => {
    try {
        const {
            contentMarkdown, contentHTML, actions, doctorId, description,
            selectedPrice, selectedPayment, selectedProvince,
            nameClinic, addressClinic, note, specialtyId, clinicId
        } = data;

        // Kiểm tra dữ liệu bắt buộc
        if (!contentMarkdown || !contentHTML || !actions || !doctorId || !description ||
            !selectedPrice || !selectedPayment || !selectedProvince ||
            !nameClinic || !addressClinic || !specialtyId || !clinicId) {
            return {
                errCode: 1,
                errMessage: 'Missing required parameters'
            };
        }

        // ====== Lưu bảng Markdown ======
        if (actions === 'CREATE') {
            await db.Markdown.create({
                contentMarkdown,
                contentHTML,
                description,
                doctorId
            });
        } else if (actions === 'EDIT') {
            const doctorMarkdown = await db.Markdown.findOne({
                where: { doctorId },
                raw: false
            });

            if (doctorMarkdown) {
                doctorMarkdown.contentMarkdown = contentMarkdown;
                doctorMarkdown.contentHTML = contentHTML;
                doctorMarkdown.description = description;
                await doctorMarkdown.save();
            }
        }

        // ====== Lưu bảng Doctor_Info ======
        const doctorInfo = await db.Doctor_Info.findOne({
            where: { doctorId },
            raw: false
        });

        if (doctorInfo) {
            // Update
            doctorInfo.priceId = selectedPrice;
            doctorInfo.paymentId = selectedPayment;
            doctorInfo.provinceId = selectedProvince;
            doctorInfo.nameClinic = nameClinic;
            doctorInfo.addressClinic = addressClinic;
            doctorInfo.note = note;
            doctorInfo.specialtyId = specialtyId;
            doctorInfo.clinicId = clinicId;
            await doctorInfo.save();
        } else {
            // Create
            await db.Doctor_Info.create({
                doctorId,
                priceId: selectedPrice,
                paymentId: selectedPayment,
                provinceId: selectedProvince,
                nameClinic,
                addressClinic,
                note,
                specialtyId,
                clinicId
            });
        }

        return {
            errCode: 0,
            errMessage: 'Save info doctor successfully'
        };

    } catch (e) {
        console.error(e);
        return {
            errCode: -1,
            errMessage: 'Error from server'
        };
    }
};


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
                        {
                            model: db.Markdown,
                            as: 'markdownData',
                            attributes: ['contentMarkdown', 'contentHTML', 'description']
                        },
                        {
                            model: db.Allcode,
                            as: 'positionData',
                            attributes: ['valueEn', 'valueVi']
                        },
                        {
                            model: db.Doctor_Info,
                            as: 'DoctorInfoData',
                            attributes: ['priceId', 'provinceId', 'paymentId', 'addressClinic', 'nameClinic', 'note'],
                            include: [
                                { model: db.Allcode, as: 'priceData', attributes: ['valueEn', 'valueVi'] },
                                { model: db.Allcode, as: 'provinceData', attributes: ['valueEn', 'valueVi'] },
                                { model: db.Allcode, as: 'paymentData', attributes: ['valueEn', 'valueVi'] },
                            ]
                        }
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
            // console.log("Check existing: ", existing);


            // Compare difference
            let toCreate = _.differenceWith(schedule, existing, (a, b) => {
                let newDate = new Date(b.date).getTime()
                return a.timeType === b.timeType && a.date === newDate;
            });
            // console.log("Check toCreate: ", toCreate);


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
                        },
                        { model: db.User, as: 'doctorData', attributes: ['firstName', 'lastName'] },

                    ],
                    raw: false,
                    nest: true,
                    order: [
                        ['timeType', 'ASC']
                    ]
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

let getExtraInfoDoctorById = (doctorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId) {
                reject({
                    errCode: 1,
                    errMessage: "Missing required parameter!"
                })
            } else {
                let data = await db.Doctor_Info.findOne({
                    where: {
                        doctorId: doctorId
                    },
                    attributes: {
                        exclude: ['id', 'doctorId']
                    },
                    include: [
                        { model: db.Allcode, as: 'priceData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Allcode, as: 'provinceData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Allcode, as: 'paymentData', attributes: ['valueEn', 'valueVi'] },
                    ],
                    raw: true,
                    nest: true
                })
                if (!data) data = {};
                resolve({
                    errCode: 0,
                    data: data
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}



module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctor: getAllDoctor,
    saveInfoDoctor: saveInfoDoctor,
    getDetailDoctor: getDetailDoctor,
    bulkCreateSchedule: bulkCreateSchedule,
    getDoctorSchedule: getDoctorSchedule,
    getExtraInfoDoctorById: getExtraInfoDoctorById,
}