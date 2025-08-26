require('dotenv').config();
const nodemailer = require("nodemailer");

const createTransporter = () => {
    return nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });
};

const sendEmail = async (dataSend) => {
    try {
        const transporter = createTransporter();
        const info = await transporter.sendMail({
            from: `"Hỏi dân IT" <${process.env.EMAIL_APP}>`,
            to: dataSend.receiverEmail,
            subject: dataSend.language === 'vi'
                ? "Thông tin đặt lịch khám bệnh"
                : "Appointment Booking Information",
            html: getBodyHTMLEmail(dataSend.language, dataSend),
        });
        console.log('Email sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

const sendAttachment = async (dataSend) => {
    try {
        const transporter = createTransporter();
        const info = await transporter.sendMail({
            from: `"Hỏi dân IT" <${process.env.EMAIL_APP}>`,
            to: dataSend.email,
            subject: dataSend.language === 'vi'
                ? "Kết quả đặt lịch khám bệnh"
                : "Appointment Booking Result",
            html: getBodyHTMLEmailRemedy(dataSend.language, dataSend),
            attachments: [
                {
                    filename: 'prescription.png',
                    content: dataSend.attachmentBase64.split("base64,")[1],
                    encoding: 'base64',
                }
            ],
        });
        console.log('Email with attachment sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending attachment:', error);
    }
};

const getBodyHTMLEmail = (language, dataSend) => {
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
};

const getBodyHTMLEmailRemedy = (language, dataSend) => {
    if (language === 'vi') {
        return `
            <h3>Xin chào ${dataSend.patientName},</h3>
            <p>Bạn nhận được email này vì đã hoàn tất việc khám bệnh online trên BookingCare.</p>
            <p>Chúng tôi gửi kèm theo file đơn thuốc hoặc kết quả khám bệnh của bạn.</p>
            <div><b>Thời gian khám: </b>${dataSend.time}</div>
            <div><b>Bác sĩ phụ trách: </b>${dataSend.doctorName}</div>
            <p>Vui lòng kiểm tra file đính kèm để xem chi tiết đơn thuốc hoặc kết quả khám.</p>
            <div>Xin cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của BookingCare!</div>
        `;
    }

    if (language === 'en') {
        return `
            <h3>Dear ${dataSend.patientName},</h3>
            <p>You received this email because your online medical appointment on BookingCare has been completed.</p>
            <p>We have attached your prescription or medical result in this email.</p>
            <div><b>Appointment time: </b>${dataSend.time}</div>
            <div><b>Doctor: </b>${dataSend.doctorName}</div>
            <p>Please check the attached file for detailed information.</p>
            <div>Thank you for choosing BookingCare!</div>
        `;
    }
};


module.exports = {
    sendEmail,
    sendAttachment,
};
