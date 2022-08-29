import nc from "next-connect";
import {  deleteUser } from '../../../../controller/admin/admin'

const handler=nc();

handler.put(deleteUser);


export default handler;