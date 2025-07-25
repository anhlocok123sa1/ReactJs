import db from "../models/index"
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (e) {
            reject(e)
        }
    })
}

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                //user already exist
                let user = await db.User.findOne({
                    where: { email: email },
                    attributes: ['email', 'roleId', 'password', 'firstName', 'lastName'],
                    raw: true
                })

                if (user) {
                    let check = await bcrypt.compare(password, user.password);

                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'ok';

                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password!';
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = 'User is not exist!';
                }
                resolve(userData);
            } else {
                //return error
                userData.errCode = 1;
                userData.errMessage = `Your Email isn't exist in our system. Pls try another email`;
                resolve(userData);
            }
        } catch (e) {
            reject(e)
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    email: userEmail
                }
            })
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e)
        }
    })
}

let GetAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId }
                })
            }
            resolve(users)
        } catch (e) {
            reject(e);
        }
    })
}

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            //Check email exist
            let check = await checkUserEmail(data.email);
            if (check) {
                resolve({
                    errCode: 1,
                    errMessage: "Your email is already in use, Pls try another email!"
                })
            } else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password)
                // console.log("Check image: ",data);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender,
                    roleId: data.roleId,
                    positionId: data.position,
                    image: data.avatar
                })
                resolve({
                    errCode: 0,
                    message: "ok"
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}

let deleteUser = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            })
            if (!user) {
                resolve({
                    errCode: 2,
                    errMessage: "User isn't exists!"
                })
            }
            await db.User.destroy({
                where: { id: userId }
            });
            resolve({
                errCode: 0,
                message: "User is deleted"
            })
        } catch (e) {
            reject(e)
        }
    })
}

let editUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.roleId || !data.positionId ||!data.gender) {
                resolve({
                    errCode: 2,
                    errMessage: "Missing required parameter!"
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.phoneNumber = data.phoneNumber;
                user.roleId = data.roleId;
                user.positionId = data.positionId;
                user.gender = data.gender;
                if (data.avatar) {
                    user.image = data.avatar;
                }
                await user.save();

                resolve({
                    errCode: 0,
                    message: "Update user success!"
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: "User not found!"
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllCodeServices = async (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters!'
                })
            } else {
                let res = {};
                let allcode = await db.Allcode.findAll({
                    where: { type: typeInput }
                });
                res.errCode = 0;
                res.data = allcode;
                resolve(res);

            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    GetAllUsers: GetAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    editUser: editUser,
    getAllCodeServices: getAllCodeServices
}