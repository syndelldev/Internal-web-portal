import nc from "next-connect";
import { getUserById, deleteUser } from '../../../controller/admin/admin'

const handler=nc();

handler.get(getUserById);
// handler.get(deleteUser)

export default handler;