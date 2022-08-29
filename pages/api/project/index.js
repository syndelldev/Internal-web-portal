import nc from "next-connect";
import { getAllProject } from "../../../controller/project";

const handler=nc();

handler.get(getAllProject);


export default handler;