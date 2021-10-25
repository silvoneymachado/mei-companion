/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "../../../lib/prisma";
import * as bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
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
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(user.password, saltOrRounds);
      const result = await prisma.user.update({
        where: { id: user.id },
        data: {
          ...user,
          password: hash
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
