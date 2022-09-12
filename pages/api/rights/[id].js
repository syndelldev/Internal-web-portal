import nc from "next-connect";
import { ModuleById } from '../../../controller/admin/rights'

const handler=nc();

handler.post(ModuleById);
// handler.post(update_checkbox);

export default handler;