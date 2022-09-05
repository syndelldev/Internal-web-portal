import nc from "next-connect";
import { TaskModuleById } from '../../../controller/admin/taskmodule'

const handler=nc();

handler.get(TaskModuleById);
//handler.put(UpdateUserRights);

export default handler;