import nc from "next-connect";
import { modules } from '../../../controller/admin/rights'

const handler=nc();
handler.get(modules);

export default handler;