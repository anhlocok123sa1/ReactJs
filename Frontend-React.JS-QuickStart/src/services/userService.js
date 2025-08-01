import axios from "../axios"
const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword })
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

const createNewUserServices = (data) => {
    // console.log('Check data from services image: ', data);
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

const getTopDoctorHomeServices = (limit) => {
    return axios.get(`/api/top-doctoc-home?limit=${limit}`)
}

const getAllDoctorsServices = () => {
    return axios.get('/api/get-all-doctors')
}

const saveInfoDoctorServices = (data) => {
    return axios.post('/api/save-info-doctor', data);
}

const getDetailsDoctorServices = (inputId) => {
    return axios.get(`/api/get-detail-doctor?doctorId=${inputId}`)
}

const bulkCreateScheduleServices = (data) => {
    return axios.post('/api/bulk-create-schedule', data);
}

export { handleLoginApi, getAllUsers, createNewUserServices, deleteUserServices, editUserServices, getAllCodeServices, getTopDoctorHomeServices , getAllDoctorsServices, saveInfoDoctorServices, getDetailsDoctorServices, bulkCreateScheduleServices };