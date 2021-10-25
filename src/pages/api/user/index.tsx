/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
  const authorization = req.headers.authorization;

  if (authorization) {
    const methods = {
      PUT: () => update(req.body),
    };

    methods[req.method]();
  } else {
    res.status(401).json({
      ok: false,
      status: 401,
      statusText: "Unauthorized",
    });
  }


  async function update(user: any) {
    try {
      const userById = await prisma.user.findFirst({
        where: { id: user.id },
      });
      const result = await prisma.user.update({
        where: { id: user.id },
        data: {
          ...user,
          password: userById.password
        },
      });

      res.json(result);
    } catch (error) {
      res.status(500).json({
        ok: false,
        status: 500,
        statusText: error.message,
      });
    }
  }

    
}