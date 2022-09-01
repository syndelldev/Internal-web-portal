import nc from "next-connect";
import { deleteProject } from "../../../controller/project";

const handler=nc();

handler.get(deleteProject);

export default handler;