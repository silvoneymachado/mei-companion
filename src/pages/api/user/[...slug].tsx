/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../util/models";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
  const authorization = req.headers.authorization;
  const { slug } = req.query;
  const idParam = isNaN(parseInt(String(slug[0])))
    ? null
    : parseInt(String(slug[0]));

  if (authorization) {
    const methods = {
      GET: () => resolveGetRequest(slug as string[]),
      DELETE: () => remove(idParam),
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

  function resolveGetRequest(params: string[]) {
    if (!isNaN(idParam) && idParam > 0) {
      getById(idParam);
    } else {
      res.status(404).json({
        ok: false,
        status: 404,
        statusText: `${params[1]} path not found`,
      });
    }
  }

  async function getById(id: number) {
    try {
      const result = await prisma.user.findFirst({
        where: { id: id },
      });
      res.json({
        ...result,
        password: '',
      } as User);
    } catch (error) {
      res.status(500).json({
        ok: false,
        status: 500,
        statusText: error.message,
      });
    }
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

  async function remove(id: number) {
    try {
      const result = await prisma.user.delete({
        where: { id: id },
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