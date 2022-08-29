import nc from "next-connect";
import { ProjectPerson } from '../../../controller/user_dashboard'

const handler=nc();

handler.get(ProjectPerson);

export default handler;