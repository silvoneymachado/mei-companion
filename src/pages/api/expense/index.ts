/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { Expense } from "../../../util/models";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authorization = req.headers.authorization;

  if (authorization) {
    const methods = {
      POST: () => addItem(req.body),
      GET: () => getAll(),
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

  async function addItem(expense: any) {
    try {
      const result = await prisma.expense.create({
        data: {
          ...expense,
          id: Number(expense.id),
          value: Number(expense.value),
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

  async function getAll() {
    try {
      const result = await prisma.expense.findMany();
      res.json(result);
    } catch (error) {
      res.status(500).json({
        ok: false,
        status: 500,
        statusText: error.message,
      });
    }
  }

  async function update(expense: any) {
    try {
      const result = await prisma.expense.update({
        where: { id: expense.id },
        data: {
          ...expense,
          value: Number(expense.value),
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
