import axios from 'axios';
// eslint-disable-next-line
import _ from 'lodash';
// eslint-disable-next-line
import config from './config';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: true
});

instance.interceptors.response.use(
    (response) => {
        // eslint-disable-next-line
        const { data } = response;
        return response.data;
    }
);

export default instance;
