import nc from "next-connect";
import { userProfile } from '../../../controller/user_dashboard'

const handler=nc();

handler.get(userProfile);

export default handler;