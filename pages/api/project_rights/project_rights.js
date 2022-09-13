import nc from "next-connect";
import { Project } from '../../../controller/project_rights/project_rights'

const handler=nc();

handler.get(Project);

export default handler;