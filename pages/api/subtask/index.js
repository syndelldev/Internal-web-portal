import nc from "next-connect";
import { SubTaskList } from '../../../controller/subtask/subtask'

const handler=nc();

handler.get(SubTaskList);

export default handler;