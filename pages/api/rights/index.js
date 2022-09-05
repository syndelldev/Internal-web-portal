import nc from "next-connect";
import { TaskModule } from '../../../controller/admin/taskmodule'

const handler=nc();
handler.get(TaskModule);

export default handler;