import db from "../models/index"

let createClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const {
                name,
                address,
                imageBase64,
                backgroundBase64,
                descriptionHTML,
                descriptionMarkdown,
            } = data || {};

            // Validate
            if (!name || !address || !imageBase64 || !descriptionHTML || !descriptionMarkdown || !backgroundBase64) {
                return resolve({ errCode: 1, errMessage: 'Missing required parameter' });
            } else {
                await db.Clinic.create({
                    name,
                    address,
                    image: imageBase64,
                    descriptionHTML,
                    descriptionMarkdown,
                    background: backgroundBase64,
                });
                return resolve({ errCode: 0, errMessage: 'Create ok' });
            }
        } catch (e) {
            reject(e);
        }
    });
}

let getAllClinic = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Clinic.findAll({
                attributes: ['id', 'name', 'image'],
            });
            if (data && data.length > 0) {
                data.map(item => {
                    item.image = new Buffer(item.image, 'base64').toString('binary');
                    return item;
                });
            }
            return resolve({ errCode: 0, errMessage: 'Ok', data });
        } catch (e) {
            reject(e);
        }
    });
}

let getDetailsClinicById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                return resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter"
                });
            } else {
                let data = await db.Clinic.findOne({
                    where: { id },
                    attributes: ['name', 'address', 'descriptionHTML', 'descriptionMarkdown', 'background', 'image'],
                });
                if (data) {
                    data.background = new Buffer(data.background, 'base64').toString('binary');
                    data.image = new Buffer(data.image, 'base64').toString('binary');
                    let doctorClinic = [];
                    doctorClinic = await db.Doctor_Info.findAll({
                        where: { clinicId: id },
                        attributes: ['doctorId', 'provinceId'],
                    });
                    data.doctorClinic = doctorClinic;
                } else data = {};
                return resolve({
                    errCode: 0,
                    errMessage: "Ok",
                    data
                });
            }
        } catch (e) {
            reject(e);
        }
    });
}

let getAllClinicRedux = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Clinic.findAll();
            if (data && data.length > 0) {
                data.map(item => {
                    item.image = new Buffer(item.image, 'base64').toString('binary');
                    item.background = new Buffer(item.background, 'base64').toString('binary');
                    return item;
                });
            }
            return resolve({ errCode: 0, errMessage: 'Ok', data });
        } catch (e) {
            reject(e);
        }
    });
}

let deleteClinic = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                return resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter"
                });
            } else {
                let clinic = await db.Clinic.findOne({
                    where: { id }
                });
                if (!clinic) {
                    return resolve({
                        errCode: 2,
                        errMessage: `The clinic isn't exist`
                    });
                }
                let doctorClinic = await db.Doctor_Info.update(
                    { clinicId: null },
                    { where: { clinicId: id } }
                );
                if (doctorClinic && doctorClinic.length > 0) {
                    doctorClinic.map(async item => {
                        item.clinicId = null;
                        await item.save();
                    });
                }
                await db.Clinic.destroy({
                    where: { id }
                });
                return resolve({
                    errCode: 0,
                    errMessage: "The clinic is deleted"
                });
            }
        } catch (e) {
            reject(e);
        }
    }
    );
}

let updateClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                return resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter"
                });
            } else {
                let clinic = await db.Clinic.findOne({
                    where: { id: data.id },
                    raw: false
                });
                if (clinic) {
                    clinic.name = data.name;
                    clinic.address = data.address;
                    clinic.descriptionHTML = data.descriptionHTML;
                    clinic.descriptionMarkdown = data.descriptionMarkdown;
                    if (data.imageBase64) {
                        clinic.image = data.imageBase64;
                    }
                    if (data.backgroundBase64) {
                        clinic.background = data.backgroundBase64;
                    }
                    await clinic.save();
                    return resolve({
                        errCode: 0,
                        errMessage: "Update the clinic succeeds!"
                    });
                } else {
                    return resolve({
                        errCode: 2,
                        errMessage: `The clinic isn't exist`
                    });
                }
            }
        } catch (e) {
            reject(e);
        }
    }
    );
}


module.exports = {
    createClinic: createClinic,
    getAllClinic: getAllClinic,
    getDetailsClinicById: getDetailsClinicById,
    getAllClinicRedux: getAllClinicRedux,
    deleteClinic: deleteClinic,
    updateClinic: updateClinic
}
