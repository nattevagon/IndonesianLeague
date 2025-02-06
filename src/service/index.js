import axios from 'axios';

export const apps = (store) => JSON.stringify(store);
const Axios = (url = null) => {
    let baseURL = null;
    const instance = axios.create();
    instance.defaults.headers.common['Content-Type'] = 'application/json';

    return instance;
};

export const Services = (url) => ({
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