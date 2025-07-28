import db from "../models"

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

module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctor: getAllDoctor,
    saveInfoDoctor: saveInfoDoctor,
    getDetailDoctor: getDetailDoctor
}