require('dotenv').config();
const nodemailer = require("nodemailer");

let sendEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    let info = await transporter.sendMail({
        from: `"Hỏi dân IT" <${process.env.EMAIL_APP}>`,
        to: dataSend.receiverEmail,
        subject: dataSend.language === 'vi'
            ? "Thông tin đặt lịch khám bệnh"
            : "Appointment Booking Information",
        html: getBodyHTMLEmail(dataSend.language, dataSend),
    });

    console.log("Message sent: %s", info.messageId);
};

let getBodyHTMLEmail = (language, dataSend) => {
    if (language === 'vi') {
        return `
        <h3>Xin chào ${dataSend.patientName}</h3>
        <h4>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên Bookingcare</h4>
        <p>Thông tin đặt lịch khám bệnh:</p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
        <p>Nếu các thông tin trên là đúng thì hãy nhấn vào đường link bên dưới để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh</p>
        <div>
            <a href="${dataSend.redirectLink}" target="_blank">Xác nhận lịch hẹn</a>
        </div>
        <div>Xin chân thành cảm ơn!</div>
        `;
    }

    if (language === 'en') {
        return `
        <h3>Dear ${dataSend.patientName}</h3>
        <h4>You received this email because you booked an online medical appointment on Bookingcare</h4>
        <p>Appointment details:</p>
        <div><b>Time: ${dataSend.time}</b></div>
        <div><b>Doctor: ${dataSend.doctorName}</b></div>
        <p>If the above information is correct, please click the link below to confirm and complete your appointment booking</p>
        <div>
            <a href="${dataSend.redirectLink}" target="_blank">Confirm Appointment</a>
        </div>
        <div>Thank you very much!</div>
        `;
    }
};

module.exports = { sendEmail };
