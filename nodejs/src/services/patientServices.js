// services/bookingService.js
require('dotenv').config();
const db = require('../models');
const { sendEmail } = require('./emailServices');

let saveBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        const t = await db.sequelize.transaction();
        try {
            const { email, doctorId, timeType, date } = data || {};
            if (!email || !doctorId || !timeType || !date) {
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

            try { await sendEmail({
                receiverEmail:data.email,
                patientName:"Patient Name",
                time:"8:00 - 9:00 Chủ nhật 14/08/2025",
                doctorName:"Doctor Name",
                redirectLink:"https://www.youtube.com/watch?v=0GL--Adfqhc&list=PLncHg6Kn2JT6E38Z3kit9Hnif1xC_9VqI&index=97"
            }); } catch (e) { console.error('Send email failed:', e); }

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
