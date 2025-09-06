import { serverSideService } from "@/service/serverSideService";

const postAction = async (pathAPI, params, config) => {
    const { data } = await serverSideService().post(pathAPI, params, config);
    console.log("CALL API:", pathAPI, params, config);

    return data;
};

const loadData = async (req, res, generatePathAPI) => {
    const { body } = req;
    let requestBody = body
    let headers = {
        "Content-Type": "application/json",
    };

    try {
        const data = await postAction(generatePathAPI, requestBody, { headers });
        res.status(200).json(data);
    } catch (error) {
        res.status(error?.response?.status || 500).send(error?.response?.data || 'Internal Server Error');
    }
};

export default async function handler(req, res) {
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method === 'POST') {
        const { path } = req.query;
        const generatePathAPI = `/${path.join('/')}`;

        await loadData(req, res, generatePathAPI);
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}