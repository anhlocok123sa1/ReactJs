import patientServices from "../services/patientServices"

let postBookAppointment = async (req, res) => {
    try {
        let response = await patientServices.saveBookAppointment(req.body);
        return res.status(200).json(response);
    } catch (e) {
        console.error("Error in postBookAppointment:", e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        });
    }
}

let postVerifyBookAppointment = async (req, res) => {
    try {
        let response = await patientServices.saveVerifyBookAppointment(req.body);
        return res.status(200).json(response);
    } catch (e) {
        console.error("Error in postVerifyBookAppointment:", e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        });
    }
}

module.exports = {
    postBookAppointment: postBookAppointment,
    postVerifyBookAppointment: postVerifyBookAppointment
}