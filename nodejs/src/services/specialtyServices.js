import db from "../models/index"

let createSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const {
                name,
                imageBase64,
                descriptionHTML,
                descriptionMarkdown,
            } = data || {};

            // Validate
            if (!name || !imageBase64 || !descriptionHTML || !descriptionMarkdown) {
                return resolve({ errCode: 1, errMessage: 'Missing required parameter' });
            } else {
                await db.Specialty.create({
                    name,
                    image: imageBase64,
                    descriptionHTML,
                    descriptionMarkdown
                });
                return resolve({ errCode: 0, errMessage: 'Create ok' });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let getAllSpecialty = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let specialties = await db.Specialty.findAll();
            if (specialties && specialties.length > 0) {
                specialties = specialties.map(item => {
                    return {
                        ...item,
                        image: Buffer.from(item.image, 'base64').toString('binary') // Convert base64 to binary
                    };
                }
                );
            }
            if (!specialties) {
                specialties = [];
            }
            return resolve({
                errCode: 0,
                errMessage: 'OK',
                data: specialties
            });
        } catch (e) {
            reject(e);
        }
    });
}
let getDetailsSpecialtyById = (id, location) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id || !location) {
                return resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                });
            }
            else {
                let data = await db.Specialty.findOne({
                    where: { id: id },
                    attributes: ['descriptionHTML', 'descriptionMarkdown'],
                    raw: true
                });

                if (data) {
                    let doctorSpecialty = [];
                    if (location === 'ALL') {
                        doctorSpecialty = await db.Doctor_Info.findAll({
                            where: { specialtyId: id },
                            attributes: ['doctorId'],
                            raw: true
                        });
                    } else {
                        doctorSpecialty = await db.Doctor_Info.findAll({
                            where: {
                                specialtyId: id,
                                provinceId: location
                            },
                            attributes: ['doctorId'],
                            raw: true
                        });
                    }
                    data.doctorSpecialty = doctorSpecialty;
                } else {
                    data = {};
                }
                return resolve({
                    errCode: 0,
                    errMessage: 'OK',
                    data: data
                });
            }
        } catch (e) {
            reject(e);
        }
    })
};

module.exports = {
    createSpecialty, getAllSpecialty,
    getDetailsSpecialtyById
};
