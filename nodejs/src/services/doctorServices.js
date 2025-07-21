import db from "../models"

let getTopDoctorHome = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                limit: limit,
                where: { roleId: 'R2' }, // Assuming R2 is the role for doctors
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

module.exports = {
    getTopDoctorHome: getTopDoctorHome,
}