import nc from "next-connect";
import { ProjectById } from '../../../../controller/admin/rights'

const handler=nc();

handler.put(ProjectById);
// handler.post(update_checkbox);

export default handler;