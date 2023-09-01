import Controller from "@/src/Controllers/Controller"
import CreateMessageRequest from "@/src/Requests/CreateMessageRequest"
import type {Message} from "@prisma/client/index.d.ts"
import UpdateMessageRequest from "@/src/Requests/UpdateMessageRequest"
import ListMessageRequest from "@/src/Requests/ListMessageRequest"
import DeleteMessageRequest from "@/src/Requests/DeleteMessageRequest"
import ShowMessageRequest from "@/src/Requests/ShowMessageRequest"

export default class MessageController extends Controller
{
    public async index(request: ListMessageRequest)
    {
        return this.db.message.findMany()
    }

    public async show(request: ShowMessageRequest, message: Message)
    {
        return message
    }

    public async store(request: CreateMessageRequest)
    {
        return this.db.message.create({
            data: request.validated()
        })
    }

    public async update(request: UpdateMessageRequest, message: Message)
    {
        return this.db.message.update({
            where: {
                id: message.id
            },
            data: request.validated()
        })
    }

    public async delete(request: DeleteMessageRequest, message: Message)
    {
        return this.db.message.delete({
            where: {
                id: message.id,
            }
        })
    }
}