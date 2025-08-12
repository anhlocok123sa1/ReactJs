import db from "../models"
require('dotenv').config();

let saveBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.timeType || !data.date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                });
            } else {
                //upsert patient
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: 'R3'
                    }
                });
                const dateMs = Number(data.date);
                if (!Number.isFinite(dateMs)) {
                    return { errCode: 1, errMessage: 'Invalid date value' };
                }

                //create booking record
                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: {
                            patientId: user[0].id,
                        },
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: dateMs,
                            timeType: data.timeType
                        }
                    })
                }

                resolve({
                    errCode: 0,
                    errMessage: 'Save book appointment success!'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    saveBookAppointment: saveBookAppointment
}