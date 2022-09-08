import nc from "next-connect";
import { projectStatus } from "../../../controller/project";

const handler=nc();

handler.get(projectStatus);

export default handler;