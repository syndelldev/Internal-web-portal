import nc from "next-connect";
import { getUserById, UpdateUser } from '../../../controller/admin/admin'

const handler=nc();

handler.get(getUserById);
// handler.get(deleteUser)
handler.put(UpdateUser);

export default handler;