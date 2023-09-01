import {NextApiRequest, NextApiResponse} from "next"
import {PrismaClient} from "@prisma/client"
import DB from "@/src/Services/DB"

export default abstract class Controller
{
    public db: PrismaClient

    constructor(
      protected req: NextApiRequest,
      protected res: NextApiResponse
    ) {
        this.db = DB.getInstance()
    }
}