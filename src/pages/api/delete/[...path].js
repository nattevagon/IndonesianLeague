import { serverSideService } from "@/service/serverSideService";

const deleteAction = async (pathAPI, params, config) => {
    const { data } = await serverSideService().delete(pathAPI, params, config);
    console.log("CALL API:", pathAPI, params, config);

    return data;
};

const loadData = async (req, res, generatePathAPI) => {
    let params = { ...req.query };

    let headers = {
        "Content-Type": "application/json",
    };

    try {
        const data = await deleteAction(generatePathAPI, params, { headers });
        res.status(200).json(data);
    } catch (error) {
        console.error("API ERROR:", error?.response?.data || error.message);
        res.status(error?.response?.status || 500).json(
            error?.response?.data || { message: "Internal Server Error" }
        );
    }
};

const handler = async (req, res) => {
    if (req.method === "OPTIONS") {
        res.status(200).end();
        return;
    }

    if (req.method === "DELETE") {
        const { path } = req.query;
        const generatePathAPI = `/${path.join("/")}`;
        delete req.query.path;

        await loadData(req, res, generatePathAPI);
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
};

export default handler;