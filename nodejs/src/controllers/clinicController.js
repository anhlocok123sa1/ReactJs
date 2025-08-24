import clinicServices from "../services/clinicServices"

let createClinic = async (req, res) => {
    try {
        let response = await clinicServices.createClinic(req.body);
        return res.status(200).json(response);
    } catch (e) {
        console.error("Error in createClinic:", e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        });
    }
}

let getAllClinic = async (req, res) => {
    try {
        let response = await clinicServices.getAllClinic();
        return res.status(200).json(response);
    } catch (e) {
        console.error("Error in getAllClinic:", e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        });
    }
}

let getDetailsClinicById = async (req, res) => {
    try {
        let id = req.query.id;
        if (!id) {
            return res.status(200).json({
                errCode: 1,
                errMessage: "Missing required parameter"
            });
        } else {
            let response = await clinicServices.getDetailsClinicById(id);
            return res.status(200).json(response);
        }
    } catch (e) {
        console.error("Error in getDetailsClinicById:", e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        });
    }
}

let getAllClinicRedux = async (req, res) => {
    try {
        let response = await clinicServices.getAllClinicRedux();
        return res.status(200).json(response);
    } catch (e) {
        console.error("Error in getAllClinicRedux:", e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        });
    }
}

let handleDeleteClinic = async (req, res) => {
    try {
        let id = req.query.id;
        if (!id) {
            return res.status(200).json({
                errCode: 1,
                errMessage: "Missing required parameter"
            });
        } else {
            let response = await clinicServices.deleteClinic(id);
            return res.status(200).json(response);
        }
    } catch (e) {
        console.error("Error in handleDeleteClinic:", e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        });
    }
}

let handleEditClinic = async (req, res) => {
    try {
        let data = req.body;
        if (!data.id) {
            return res.status(200).json({
                errCode: 1,
                errMessage: "Missing required parameter"
            });
        } else {
            let response = await clinicServices.updateClinic(data);
            return res.status(200).json(response);
        }
    } catch (e) {
        console.error("Error in handleEditClinic:", e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        });
    }
}

module.exports = {
    createClinic: createClinic,
    getAllClinic: getAllClinic,
    getDetailsClinicById: getDetailsClinicById,
    getAllClinicRedux: getAllClinicRedux,
    handleDeleteClinic: handleDeleteClinic,
    handleEditClinic: handleEditClinic
}