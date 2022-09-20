import nc from "next-connect";
import { getRightList } from '../../../controller/admin/right_lists'

const handler=nc();
handler.post(getRightList);

export default handler;