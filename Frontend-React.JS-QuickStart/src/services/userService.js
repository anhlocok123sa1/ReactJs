import axios from "../axios"
const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword })
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

const createNewUserServices = (data) => {
    // console.log('Check data from services: ', data);
    return axios.post('/api/create-new-user', data);
}

const deleteUserServices = (userId) => {
    return axios.delete('/api/delete-user', { data: { id: userId } });
}

const editUserServices = (data) => {
    // console.log('Check data from services: ', data);
    return axios.put('/api/edit-user', data)
}

const getAllCodeServices = (inputType) => {
    return axios.get(`/api/all-code?type=${inputType}`)
}

export { handleLoginApi, getAllUsers, createNewUserServices, deleteUserServices, editUserServices, getAllCodeServices }