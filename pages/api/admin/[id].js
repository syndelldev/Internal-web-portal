import nc from "next-connect";
import { getUserById } from '../../../controller/admin/admin'

const handler=nc();

handler.get(getUserById);


export default handler;