import db from "../models/index"

let createClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const {
                name,
                address,
                imageBase64,
                descriptionHTML,
                descriptionMarkdown,
            } = data || {};

            // Validate
            if (!name || !address || !imageBase64 || !descriptionHTML || !descriptionMarkdown) {
                return resolve({ errCode: 1, errMessage: 'Missing required parameter' });
            } else {
                await db.Clinic.create({
                    name,
                    address,
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
}

module.exports = {
    createClinic: createClinic
}