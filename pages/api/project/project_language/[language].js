import nc from "next-connect";
import { projectLanguage } from "../../../../controller/project";

const handler=nc();

handler.get(projectLanguage);

export default handler;