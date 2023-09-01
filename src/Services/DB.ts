import {PrismaClient} from "@prisma/client"

export default class DB {
  private static instance: PrismaClient;

  private constructor() { }

  public static getInstance(): PrismaClient {
    if (!DB.instance) {
      DB.instance = new PrismaClient();
    }

    return DB.instance;
  }
}