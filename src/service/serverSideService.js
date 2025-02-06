import axios from 'axios';

const Axios = (url = null) => {
    const instance = axios.create();
    if (url) {
        instance.defaults.baseURL = url;
    } else if (
        process.env.NODE_ENV === 'production'
        || process.env.NODE_ENV === 'development'
        || process.env.NODE_ENV === 'prelive'
        || process.env.NODE_ENV === 'uat'
    ) {
        instance.defaults.baseURL = 'http://localhost:7001';
    }
    instance.defaults.headers.common['Content-Type'] = 'application/json';

    return instance;
};

export const serverSideService = (url = null) => ({
    get: (endpointName, params = null, config = null) => {
        let data = {};
        if (params) {
            data.params = params;
        }
        if (config) {
            data = { ...data, ...config };
        }
        return Axios(url).get(endpointName, data);
    },
    getRequest: (endpointName, params = null, config = null) => Axios().get(endpointName, params, config),
    post: (endpointName, params = null, config = null) => Axios(url).post(endpointName, params, config),
    put: (endpointName, params = null, config = null) => Axios(url).put(endpointName, params, config),
    delete: (endpointName, params = null, config = null) => {
        let data = {};
        if (params) {
            data.params = params;
        }
        if (config) {
            data = { ...data, ...config };
        }
        return Axios(url).delete(endpointName, data);
    }
});
