import nc from "next-connect";
import { ProjectPerson } from '../../../controller/superuser'

const handler=nc();

handler.get(ProjectPerson);

export default handler;