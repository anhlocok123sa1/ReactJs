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

module.exports = {
    createSpecialty:createSpecialty
}