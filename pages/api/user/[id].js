import nc from "next-connect";
import { getUserTaskById } from '../../../controller/user/user'

const handler=nc();

handler.get(getUserTaskById);


export default handler;