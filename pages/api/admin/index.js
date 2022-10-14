import nc from "next-connect";
import { getAllUser,adminProfile,AddUser } from '../../../controller/admin/admin'

const handler=nc();

handler.get(getAllUser);
handler.post(AddUser);

export default handler;