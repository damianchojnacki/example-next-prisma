import type { NextApiRequest, NextApiResponse } from 'next'
import MessageController from "@/src/Controllers/MessageController"
import CreateMessageRequest from "@/src/Requests/CreateMessageRequest"
import RequestHandler from "@/src/Services/RequestHandler"
import ListMessageRequest from "@/src/Requests/ListMessageRequest"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const controller = new MessageController(req, res)

  await RequestHandler.capture(req, res, controller,[
    {
      methods: ['GET'],
      action: 'index',
      request: ListMessageRequest,
    },
    {
      methods: ['POST'],
      action: 'store',
      request: CreateMessageRequest,
    },
  ])
}
