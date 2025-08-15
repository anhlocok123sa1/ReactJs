import doctorService from "../services/doctorServices";

let getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10; // Default limit if not provided
    try {
        let response = await doctorService.getTopDoctorHome(+limit);
        return res.status(200).json(response);
    } catch (e) {
        console.error("Error in getTopDoctorHome:", e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        });
    }
}

let getAllDoctor = async (req, res) => {
    try {
        let response = await doctorService.getAllDoctor();
        return res.status(200).json(response);
    } catch (e) {
        console.error("Error in getAllDoctor:", e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        });
    }
}

let postInfoDoctor = async (req, res) => {
    try {
        let response = await doctorService.saveInfoDoctor(req.body);
        return res.status(200).json(response);
    } catch (e) {
        console.error("Error in postInfoDoctor:", e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        });
    }
}

let getDetailDoctor = async (req, res) => {
    try {
        let response = await doctorService.getDetailDoctor(req.query.doctorId);
        return res.status(200).json(response);
    } catch (e) {
        console.error("Error in getDetailDoctor:", e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        });
    }
}

let bulkCreateSchedule = async (req, res) => {
    try {
        let response = await doctorService.bulkCreateSchedule(req.body);
        return res.status(200).json(response);
    }
    catch (e) {
        console.error("Error in bulkCreateSchedule:", e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        });
    }
}

let getDoctorSchedule = async (req, res) => {
    try {
        let response = await doctorService.getDoctorSchedule(req.query);
        return res.status(200).json(response)
    }
    catch (e) {
        console.log("Error in getDoctorSchedule: ", e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })

    }
}

let getExtraInfoDoctorById = async (req, res) => {
    try {
        let response = await doctorService.getExtraInfoDoctorById(req.query.doctorId);
        return res.status(200).json(response)
    }
    catch (e) {
        console.log("Error in getExtraInfoDoctorById: ", e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })

    }
}

module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctor: getAllDoctor,
    postInfoDoctor: postInfoDoctor,
    getDetailDoctor: getDetailDoctor,
    bulkCreateSchedule: bulkCreateSchedule,
    getDoctorSchedule: getDoctorSchedule,
    getExtraInfoDoctorById: getExtraInfoDoctorById,
}