import userServices from "../services/userServices"

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter!'
        })
    }

    let userData = await userServices.handleUserLogin(email, password)

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

let handleGetAllUsers = async (req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameter',
            users: []
        })
    }

    let users = await userServices.GetAllUsers(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        users
    })

}

let handleCreateNewUser = async (req, res) => {
    // console.log('Check req:',req);
    let message = await userServices.createNewUser(req.body);
    return res.status(200).json(message)
}

let handleEditUser = async (req, res) => {
    let data = req.body;
    // console.log(data);
    let message = ''
    try {
        message = await userServices.editUser(data);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
    return res.status(200).json(message);
}

let handleDeleteUser = async (req, res) => {    
    if(!req.body.id){
        return res.status(200).json({
            errCode:1,
            errMessage: "Missing required parameters!"
        })
    }
    let message = await userServices.deleteUser(req.body.id);
    return res.status(200).json(message)
}

let getAllCode = async (req, res) => {
    try {
        let data = await userServices.getAllCodeServices(req.query.type);
        return res.status(200).json(data);
    } catch(e) {
        console.log('Get all code error: ', e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
    getAllCode: getAllCode
}