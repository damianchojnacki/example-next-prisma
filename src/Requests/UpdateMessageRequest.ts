import Request from "@/src/Requests/Request"
import vine from "@vinejs/vine"

export interface UpdateMessageRequestBody
{
  content?: string,
  email?: string
  firstname?: string
  lastname?: string
}

export default class UpdateMessageRequest extends Request<UpdateMessageRequestBody>
{
    protected schema()
    {
        return vine.object({
            content: vine.string().optional(),
            email: vine.string().optional(),
            firstname: vine.string().optional(),
            lastname: vine.string().optional(),
        })
    }
}