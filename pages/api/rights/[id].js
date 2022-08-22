import nc from "next-connect";
import { rightsById } from '../../../controller/admin/rights'

const handler=nc();

handler.get(rightsById);

export default handler;