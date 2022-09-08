import nc from "next-connect";
import { ProjectById } from '../../../../controller/admin/rights'

const handler=nc();

handler.post(ProjectById);


export default handler;