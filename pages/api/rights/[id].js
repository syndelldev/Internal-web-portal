import nc from "next-connect";
import { ModuleById } from '../../../controller/admin/rights'

const handler=nc();

handler.post(ModuleById);


export default handler;