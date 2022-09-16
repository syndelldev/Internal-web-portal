import nc from "next-connect";
import { getTaskById } from "../../../controller/subtask";

const handler=nc();

handler.get(getTaskById);

export default handler;