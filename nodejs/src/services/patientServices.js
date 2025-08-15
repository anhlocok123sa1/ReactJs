// services/bookingService.js
require('dotenv').config();
const db = require('../models');
const { sendEmail } = require('./emailServices');

let saveBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        const t = await db.sequelize.transaction();
        try {
            const { email, doctorId, timeType, date, fullName, timeString, language, doctorName } = data || {};
            if (!email || !doctorId || !timeType || !date || !fullName || !timeString || !language) {
                resolve({ errCode: 1, errMessage: 'Missing required parameter' });
                return;
            }

            const dateMs = Number(date);
            if (!Number.isFinite(dateMs)) {
                resolve({ errCode: 1, errMessage: 'Invalid date value' });
                return;
            }

            const [user] = await db.User.findOrCreate({
                where: { email },
                defaults: { email, roleId: 'R3' },
                transaction: t,
            });

            const [booking, created] = await db.Booking.findOrCreate({
                where: {
                    patientId: user.id,
                    doctorId,
                    date: dateMs,
                    timeType,
                },
                defaults: {
                    statusId: 'S1',
                    patientId: user.id,
                    doctorId,
                    date: dateMs,
                    timeType,
                },
                transaction: t,
            });

            await t.commit();

            try {
                await sendEmail({
                    receiverEmail: email,
                    patientName: fullName,
                    time: timeString,
                    language: language,
                    doctorName: doctorName,
                    redirectLink: "https://www.youtube.com/watch?v=0GL--Adfqhc&list=PLncHg6Kn2JT6E38Z3kit9Hnif1xC_9VqI&index=97"
                });
            } catch (e) { console.error('Send email failed:', e); }

            resolve({
                errCode: 0,
                errMessage: created
                    ? 'Save book appointment success!'
                    : 'Booking already exists for this slot.',
                data: { bookingId: booking.id, created },
            });
        } catch (e) {
            await t.rollback();
            reject(e);
        }
    });
};

module.exports = { saveBookAppointment };
