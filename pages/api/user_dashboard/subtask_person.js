import nc from "next-connect";
import { TaskPerson } from '../../../controller/user_dashboard/subtask_person'

const handler=nc();

handler.get(TaskPerson);

export default handler;