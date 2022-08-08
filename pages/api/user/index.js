import nc from "next-connect";
import { userTask } from '../../../controller/user/user'

const handler=nc();

handler.get(userTask);
//handler.get(userCreateTask);


export default handler;