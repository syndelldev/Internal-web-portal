import nc from "next-connect";
import { getAllUser } from '../../../controller/admin/admin'

const handler=nc();

handler.get(getAllUser);


export default handler;