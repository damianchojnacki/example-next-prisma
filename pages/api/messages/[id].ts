import type { NextApiRequest, NextApiResponse } from 'next'
import MessageController from "@/src/Controllers/MessageController"
import CreateMessageRequest from "@/src/Requests/CreateMessageRequest"
import UpdateMessageRequest from "@/src/Requests/UpdateMessageRequest"
import DeleteMessageRequest from "@/src/Requests/DeleteMessageRequest"
import HttpException from "@/src/Exceptions/HttpException"
import RequestHandler from "@/src/Services/RequestHandler"
import ListMessageRequest from "@/src/Requests/ListMessageRequest"
import ShowMessageRequest from "@/src/Requests/ShowMessageRequest"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const controller = new MessageController(req, res)

  const message = await controller.db.message.findFirst({
    where: {
      id: parseInt(req.query.id as string)
    }
  })

  if(!message) {
    res.status(404).json({message: "Not found"})

    return
  }

  await RequestHandler.capture(req, res, controller,[
    {
      methods: ['GET'],
      action: 'show',
      request: ShowMessageRequest,
      resource: message,
    },
    {
      methods: ['PUT', 'PATCH'],
      action: 'update',
      request: UpdateMessageRequest,
      resource: message,
    },
    {
      methods: ['DELETE'],
      action: 'delete',
      request: DeleteMessageRequest,
      resource: message,
    },
  ])
}
