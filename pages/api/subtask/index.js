import nc from "next-connect";
import { getAllTask } from "../../../controller/subtask";

const handler=nc();

handler.get(getAllTask);

export default handler;