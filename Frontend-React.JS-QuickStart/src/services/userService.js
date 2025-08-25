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

const getDoctorScheduleServices = (doctorId, date) => {
    return axios.get(`/api/get-doctor-schedule`, {
        params: {
            doctorId,
            date
        }
    });
}

const getExtraInfoDoctorById = (doctorId) => {
    return axios.get(`/api/get-extra-info-doctor-by-id?doctorId=${doctorId}`)
}

const postPatientBookingAppointment = (data) => {
    return axios.post('/api/patient-book-appointment', data)
}

const postVerifyBookingAppointmentServices = (data) => {
    return axios.post('/api/verify-book-appointment', data)
}

const createNewSpecialtyServices = (data) => {
    return axios.post('/api/create-new-specialty', data)
}

const getAllSpecialtysServices = () => {
    return axios.get('/api/get-all-specialty')
}

const getDetailsSpecialtyByIdServices = (id, location) => {
    return axios.get('/api/get-details-specialty-by-id', {
        params: {
            id: id,
            location: location
        }
    });
}

const createNewClinicServices = (data) => {
    return axios.post('/api/create-new-clinic', data)
}

const getAllClinicServices = () => {
    return axios.get('/api/get-all-clinic')
}
const getDetailsClinicByIdServices = (id) => {
    return axios.get('/api/get-details-clinic-by-id', {
        params: {
            id: id
        }
    });
}

const getAllClinicRedux = () => {
    return axios.get('/api/get-all-clinic-redux')
}

const deleteClinicRedux = (clinicId) => {
    return axios.delete('/api/delete-clinic', { params: { id: clinicId } });
}

const editClinicRedux = (data) => {
    return axios.put('/api/edit-clinic', data)
}

const deleteSpecialtyRedux = (specialtyId) => {
    return axios.delete('/api/delete-specialty', { params: { id: specialtyId } });
}

const editSpecialtyRedux = (data) => {
    return axios.put('/api/edit-specialty', data)
}

const getListPatientForDoctorServices = ({doctorId, date}) => {
    return axios.get(`/api/get-list-patient-for-doctor`, { params: { doctorId, date } })
}


export { handleLoginApi, getAllUsers, createNewUserServices, deleteUserServices, editUserServices, getAllCodeServices, getTopDoctorHomeServices, getAllDoctorsServices, saveInfoDoctorServices, getDetailsDoctorServices, bulkCreateScheduleServices, getDoctorScheduleServices, getExtraInfoDoctorById, postPatientBookingAppointment, postVerifyBookingAppointmentServices, createNewSpecialtyServices, getAllSpecialtysServices, getDetailsSpecialtyByIdServices, createNewClinicServices, getAllClinicServices, getDetailsClinicByIdServices, getAllClinicRedux, deleteClinicRedux, editClinicRedux, deleteSpecialtyRedux, editSpecialtyRedux, getListPatientForDoctorServices };