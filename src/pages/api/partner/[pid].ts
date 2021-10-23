import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authorization = req.headers.authorization;
  const { pid } = req.query;
  const idParam = isNaN(parseInt(String(pid))) ? null : parseInt(String(pid));

  if (authorization) {
    const methods = {
      GET: () => getById(idParam),
      DELETE: () => remove(idParam),
    };

    methods[req.method]();
  } else {
    res.status(401).json({
      ok: false,
      status: 401,
      statusText: "Unauthorized",
    });
  }

  async function getById(id: number) {
    try {
      const result = await prisma.partner.findFirst({
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

  async function remove(id: number) {
    try {
      const result = await prisma.partner.delete({
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
