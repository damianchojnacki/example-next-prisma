import Request from "@/src/Requests/Request"
import vine from "@vinejs/vine"

export default class ShowMessageRequest extends Request<{}>
{
  public async authorize(): Promise<boolean>
  {
    return true
  }
}