import Request from "@/src/Requests/Request"
import vine from "@vinejs/vine"

export interface CreateMessageRequestBody
{
  content: string,
  email: string
  firstname: string
  lastname: string
}

export default class CreateMessageRequest extends Request<CreateMessageRequestBody>
{
  protected schema()
    {
        return vine.object({
            content: vine.string(),
            email: vine.string(),
            firstname: vine.string(),
            lastname: vine.string(),
        })
    }
}