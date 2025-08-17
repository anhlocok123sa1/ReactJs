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

module.exports = {
    createSpecialty
};
