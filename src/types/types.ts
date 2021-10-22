import { PrismaClient } from "@prisma/client";
import { NextPage } from "next";

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

export type NextApplicationPage<P = any, IP = P> = NextPage<P, IP> & {
  auth?: boolean
}