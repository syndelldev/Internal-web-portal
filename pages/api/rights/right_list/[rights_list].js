import nc from "next-connect";
import { rights_list } from '../../../../controller/admin/rights'

const handler=nc();
handler.post(rights_list);

export default handler;