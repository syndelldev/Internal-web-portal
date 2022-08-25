import nc from "next-connect";
import { getProjectById } from "../../../controller/project";

const handler=nc();

// handler.get(getProjectById);

export default handler;