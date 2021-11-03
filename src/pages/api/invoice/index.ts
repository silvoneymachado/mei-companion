import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { Invoice, User } from "../../../util/models";
import jwt from 'jsonwebtoken';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authorization = req.headers.authorization;
  const token = jwt.decode(authorization) as User;

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

  async function addItem(invoice: Invoice) {
    try {
      const result = await prisma.invoice.create({
        data: {
          userId: invoice.userId,
          partnerId: invoice.partnerId,
          invoiceNumber: invoice.invoiceNumber,
          value: Number(invoice.value),
          notes: invoice.notes,
          paymentDate: invoice.paymentDate,
          referenceDate: invoice.referenceDate,
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
      const result = await prisma.invoice.findMany({
        where: {userId: token.id}
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

  async function update(invoice: Invoice) {
    try {
      const result = await prisma.invoice.update({
        where: { id: invoice.id },
        data: {
          id: invoice.id,
          userId: invoice.userId,
          partnerId: invoice.partnerId,
          invoiceNumber: invoice.invoiceNumber,
          value: Number(invoice.value),
          notes: invoice.notes,
          paymentDate: invoice.paymentDate,
          referenceDate: invoice.referenceDate,
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
