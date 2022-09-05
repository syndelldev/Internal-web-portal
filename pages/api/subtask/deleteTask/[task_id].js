import nc from "next-connect";
import { deleteTask } from "../../../../controller/subtask";

const handler=nc();

handler.get(deleteTask);

export default handler;