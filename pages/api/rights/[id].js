import nc from "next-connect";
import { ModuleById } from '../../../controller/admin/rights'

const handler=nc();

handler.get(ModuleById);


export default handler;