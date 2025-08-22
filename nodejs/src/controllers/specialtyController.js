import specialtyServices from "../services/specialtyServices"


let createSpecialty = async (req, res) => {
    try {
        let response = await specialtyServices.createSpecialty(req.body);
        return res.status(200).json(response);
    } catch (e) {
        console.error("Error in createSpecialty:", e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        });
    }
}

let getAllSpecialty = async (req, res) => {
    try {
        let response = await specialtyServices.getAllSpecialty();
        return res.status(200).json(response);
    } catch (e) {
        console.error("Error in getAllSpecialty:", e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        });
    }
}

let getDetailsSpecialtyById = async (req, res) => {
    try {
        let response = await specialtyServices.getDetailsSpecialtyById(req.query.id, req.query.location);
        return res.status(200).json(response);
    } catch (e) {
        console.error("Error in getDetailsSpecialtyById:", e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        });
    }
    }

module.exports = {
    createSpecialty: createSpecialty,
    getAllSpecialty: getAllSpecialty,
    getDetailsSpecialtyById: getDetailsSpecialtyById
}