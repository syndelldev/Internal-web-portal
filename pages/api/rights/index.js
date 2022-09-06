import nc from "next-connect";
import { rights } from '../../../controller/admin/rights'

const handler=nc();
handler.get(rights);

export default handler;