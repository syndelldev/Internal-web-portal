import nc from "next-connect";
import { getAllUser } from "../../../controller/project";

const handler=nc();

handler.get(getAllUser);


export default handler;