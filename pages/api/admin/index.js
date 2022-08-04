import nc from "next-connect";
import { getAllData } from '../../../controller/admin/admin'

const handler=nc();
handler.get(getAllData);
export default handler;