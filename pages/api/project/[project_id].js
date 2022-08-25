import nc from "next-connect";
import { deleteProject, getProjectById } from "../../../controller/project";

const handler=nc();

handler.get(deleteProject);

export default handler;