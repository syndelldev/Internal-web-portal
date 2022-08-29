import nc from "next-connect";
import { adminProfile } from '../../../controller/admin/admin'

const handler=nc();
handler.get(adminProfile);
export default handler;