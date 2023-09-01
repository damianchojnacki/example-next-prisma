import {NextApiRequest, NextApiResponse} from "next"
import Request from "@/src/Requests/Request"
import HttpException from "@/src/Exceptions/HttpException"
import Controller from "@/src/Controllers/Controller"

export interface Route<T extends Controller> {
  methods: string[]
  action: keyof T
  request: typeof Request<any>
  resource?: any
}

export default class RequestHandler
{
  protected static async handle<T extends Controller>(req: NextApiRequest, res: NextApiResponse, controller: T, action: keyof T, request: typeof Request, resource?: any): Promise<void>
  {
    const requestInstance = new request(req, res)

    try {
      await requestInstance.handle()
    } catch (e) {
      if(e instanceof HttpException){
        res.status(e.status).json({
          message: e.message,
          ...e.data,
        })

        return
      }

      throw e
    }

    if(typeof (controller[action] ?? null) !== 'function'){
      throw new Error(`Action method does not exist on controller ${controller.constructor.name}`)
    }

    // @ts-ignore
    const response = await controller[action](requestInstance, resource)

    res.status(200).json(response)
  }

  public static async capture<T extends Controller>(req: NextApiRequest, res: NextApiResponse, controller: T, routes: Route<T>[]): Promise<void>
  {
    let resolved = false

    routes.forEach(route => {
      if(req.method && route.methods.includes(req.method)) {
        resolved = true

        this.handle(req, res, controller, route.action, route.request, route.resource)
      }
    })

    if(!resolved) {
      res.status(404).json({message: "Not found"})
    }
  }
}