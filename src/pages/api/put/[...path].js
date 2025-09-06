import { serverSideService } from "@/service/serverSideService";

const putAction = async (pathAPI, body, config) => {
    const { data } = await serverSideService().put(pathAPI, body || {}, config);
    console.log("CALL API:", pathAPI, body, config);

    return data;
};

const loadData = async (req, res, generatePathAPI) => {
    const { body } = req;
    let requestBody = Object.keys(body || {}).length > 0 ? body : undefined;

    let headers = {
        "Content-Type": "application/json",
    };

    console.log("detail API=> ", generatePathAPI, requestBody, { headers });

    try {
        const data = await putAction(generatePathAPI, requestBody, { headers });
        res.status(200).json(data);
    } catch (error) {
        console.error("API ERROR:", error?.response?.data || error.message);
        res
            .status(error?.response?.status || 500)
            .send(error?.response?.data || "Internal Server Error");
    }
};

export default async function handler(req, res) {
    if (req.method === "OPTIONS") {
        res.status(200).end();
        return;
    }

    if (req.method === "PUT") {
        const { path } = req.query;
        const generatePathAPI = `/${path.join("/")}`; // contoh: /users/delete/2

        await loadData(req, res, generatePathAPI);
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}