import nc from "next-connect";
import { rightsById,UpdateUserRights } from '../../../controller/admin/rights'

const handler=nc();

handler.get(rightsById);
handler.put(UpdateUserRights);

export default handler;