import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { Invoice } from "../../../util/models";
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

  async function addItem(invoice: Invoice) {
    try {
      const result = await prisma.invoice.create({
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
      console.log(error);
      res.status(500).json({
        ok: false,
        status: 500,
        statusText: "Erro ao processar no banco de dados",
      });
    }
  }

  async function getAll() {
    try {
      const result = await prisma.invoice.findMany();
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        status: 500,
        statusText: "Erro ao processar no banco de dados",
      });
    }
  }

  async function update(invoice: Invoice) {
    try {
      console.info("update");
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
      console.log(error);
      res.status(500).json({
        ok: false,
        status: 500,
        statusText: "Erro ao processar no banco de dados",
      });
    }
  }
}
