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
    const result = await prisma.invoice.findFirst({
      where: { id: id },
    });
    res.json(result);
  }

  async function remove(id: number) {
    console.info("remove");
    const result = await prisma.invoice.delete({
      where: { id: id },
    });
    console.log(result);
    res.json(result);
  }
}
