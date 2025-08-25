// services/bookingService.js
require('dotenv').config();
const db = require('../models');
const { sendEmail } = require('./emailServices');
const { v4: uuidv4 } = require('uuid');

/**
 * Build verify URL for frontend
 * @param {number|string} doctorId
 * @param {number|string} patientId
 * @param {string} token
 * @returns {string}
 */
let buildUrlEmail = (doctorId, patientId, token) => {
    return `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}&patientId=${patientId}`;
};

let saveBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        const t = await db.sequelize.transaction();
        try {
            const {
                email, doctorId, timeType, date,
                firstName, lastName, timeString, language, doctorName, selectedGender, address, reason, phoneNumber
            } = data || {};

            // Validate
            if (!email || !doctorId || !timeType || !date || !firstName || !lastName || !timeString || !language || !selectedGender || !address || !phoneNumber) {
                await t.rollback();
                return resolve({ errCode: 1, errMessage: 'Missing required parameter' });
            }
            const fullName = firstName + ' ' + lastName;
            const dateMs = Number(date);
            if (!Number.isFinite(dateMs)) {
                await t.rollback();
                return resolve({ errCode: 1, errMessage: 'Invalid date value' });
            }

            // Normalize optional reasonText
            const reasonText =
                typeof reason === 'string' && reason.trim().length > 0
                    ? reason.trim()
                    : null;

            // Upsert patient
            const [user] = await db.User.findOrCreate({
                where: { email },
                defaults: {
                    email,
                    roleId: 'R3',
                    gender: selectedGender,
                    address,
                    phoneNumber,
                    firstName,
                    lastName
                },
                transaction: t,
            });

            // Find or create booking for the chosen slot
            const [booking, created] = await db.Booking.findOrCreate({
                where: {
                    patientId: user.id,
                    doctorId,
                    date: dateMs,
                    timeType,
                },
                defaults: {
                    statusId: 'S1', // pending/awaiting verification
                    patientId: user.id,
                    doctorId,
                    date: dateMs,
                    timeType,
                    reasonText
                },
                transaction: t,
            });

            // If it's a new booking (created) or still pending (S1), (re)issue a verification token
            if (created || booking.statusId === 'S1') {
                const token = uuidv4();

                // Persist token into booking
                booking.token = token;
                if (reasonText !== null) {
                    booking.reasonText = reasonText; // NEW: update when pending or newly created
                }
                await booking.save({ transaction: t });

                // Build verify URL
                const verifyLink = buildUrlEmail(doctorId, user.id, token);

                // Commit before sending email to avoid duplicate emails on retry
                await t.commit();

                // Send verification email (don't fail the whole request if email fails)
                try {
                    await sendEmail({
                        receiverEmail: email,
                        patientName: fullName,
                        time: timeString,
                        language,
                        doctorName,
                        redirectLink: verifyLink,
                    });
                } catch (e) {
                    console.error('Send email failed:', e);
                }

                return resolve({
                    errCode: 0,
                    errMessage: created
                        ? 'Save book appointment success!'
                        : 'Booking is pending verification. Verification email re-sent.',
                    data: { bookingId: booking.id, created, statusId: booking.statusId },
                });
            }

            // If booking exists but not pending (e.g., confirmed/cancelled), don't re-send email
            await t.commit();
            return resolve({
                errCode: 0,
                errMessage: 'Booking already exists for this slot.',
                data: { bookingId: booking.id, created, statusId: booking.statusId },
            });
        } catch (e) {
            await t.rollback();
            console.error(e);
            return reject(e);
        }
    });
};

let saveVerifyBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        const t = await db.sequelize.transaction();
        try {
            const { token, doctorId, patientId } = data || {};

            if (!token || !doctorId || !patientId) {
                await t.rollback();
                return resolve({ errCode: 1, errMessage: 'Missing required parameter' });
            }

            // Tìm booking đang chờ xác nhận với token khớp
            const booking = await db.Booking.findOne({
                where: {
                    token: token,
                    doctorId: doctorId,
                    patientId: patientId
                },
                transaction: t,
                lock: t.LOCK.UPDATE,
                raw: false,
            });

            if (!booking) {
                await t.rollback();
                return resolve({
                    errCode: 2,
                    errMessage: 'Appointment not found or token is invalid',
                });
            }

            // Nếu đã xác nhận rồi thì báo idempotent
            if (booking.statusId === 'S2') {
                await t.commit();
                return resolve({
                    errCode: 0,
                    errMessage: 'Appointment already verified',
                    data: { bookingId: booking.id, statusId: booking.statusId },
                });
            }

            // Chỉ cho xác nhận khi đang ở trạng thái chờ (S1)
            if (booking.statusId !== 'S1') {
                await t.rollback();
                return resolve({
                    errCode: 3,
                    errMessage: 'Appointment is not pending verification',
                    data: { bookingId: booking.id, statusId: booking.statusId },
                });
            }

            // Cập nhật sang đã xác nhận
            booking.statusId = 'S2';
            booking.token = null; // xoá token để tránh reuse
            await booking.save({ transaction: t });

            await t.commit();
            return resolve({
                errCode: 0,
                errMessage: 'Verify booking success',
                data: { bookingId: booking.id, statusId: booking.statusId },
            });
        } catch (e) {
            await t.rollback();
            console.error(e);
            return reject(e);
        }
    });
};


module.exports = { saveBookAppointment, buildUrlEmail, saveVerifyBookAppointment };
