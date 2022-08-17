import nc from "next-connect";
import { getUserById, deleteUser , UpdateUser } from '../../../controller/admin/admin'

const handler=nc();

handler.get(getUserById);
handler.delete(deleteUser)
handler.put(UpdateUser)

export default handler;