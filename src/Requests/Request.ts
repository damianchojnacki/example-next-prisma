import {NextApiRequest, NextApiResponse} from "next"
import vine, {errors, VineObject} from "@vinejs/vine"
import HttpException from "@/src/Exceptions/HttpException"

export default class Request<T extends Record<string, any>>
{
    protected body: T | undefined

    public constructor(
        protected req: NextApiRequest,
        protected res: NextApiResponse
    ) {}

    public async handle(): Promise<void>
    {
        if(!await this.authorize()){
            throw new HttpException(403, "Unauthorized")
        }

        try {
            await this.validate()
        } catch (e) {
            if (e instanceof errors.E_VALIDATION_ERROR) {
                throw new HttpException(422, "Validation error", {errors: e.messages})
            }

            throw e;
        }
    }

    protected schema(): VineObject<any, any, {}>
    {
        return vine.object({});
    }

    public async validate(): Promise<void>
    {
        this.body = await vine.validate({
            schema: this.schema(),
            data: this.req.body
        })
    }

    /**
     * Get validated data
     */
    public validated(): T
    {
        if(!this.body){
            throw new Error('Request must be validated before calling validated method.')
        }

        return this.body
    }

    /**
    * Check if user is authorized to perform this request
    */
    public async authorize(): Promise<boolean>
    {
        return true;
    }
}