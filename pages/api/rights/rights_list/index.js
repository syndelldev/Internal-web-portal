import nc from "next-connect";
import { rights_list } from '../../../../controller/admin/rights_list'

const handler=nc();
handler.post(rights_list);

export default handler;