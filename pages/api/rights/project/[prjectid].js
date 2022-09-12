import nc from "next-connect";
import { ProjectById,update_checkbox } from '../../../../controller/admin/rights'

const handler=nc();

handler.post(ProjectById);
handler.post(update_checkbox);

export default handler;