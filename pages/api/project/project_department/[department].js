import nc from "next-connect";
import { projectDepartment } from "../../../../controller/project";

const handler=nc();

handler.get(projectDepartment);

export default handler;