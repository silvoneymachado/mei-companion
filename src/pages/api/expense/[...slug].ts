import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
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
    } else if (params[1] == "startDate" && params[3] === 'endDate') {
      getByRangeDate(params[2], params[4]);
    } else {
      res.status(404).json({
        ok: false,
        status: 404,
        statusText: 'Not found',
      });
    }
  }

  async function getByRangeDate(startDate: string, endDate: string) {
    try {
      console.log(startDate, endDate);
      const result = await prisma.expense.findMany({
        where: {
          AND: [
            {
              referenceDate: {
                gte: new Date(startDate),
                lte: new Date(endDate)
              },
            }
          ],
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

  async function getById(id: number) {
    try {
      const result = await prisma.expense.findFirst({
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
      console.info("remove");
      const result = await prisma.expense.delete({
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
