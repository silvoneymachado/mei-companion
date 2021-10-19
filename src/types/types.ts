import { PrismaClient } from "@prisma/client";

export {}
declare global {
  namespace NodeJS {
    interface Global {
       document: Document;
       window: Window;
       navigator: Navigator;
       prisma: PrismaClient;
    } 
  }
}
