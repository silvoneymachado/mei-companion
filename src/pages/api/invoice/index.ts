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
    const invoiceByNumber = await prisma.invoice.findFirst({
      where: { invoiceNumber: invoice.invoiceNumber },
    });

    if (invoiceByNumber) {
      res.status(409).json({
        ok: false,
        status: 409,
        statusText: "Já existe um parceiro cadastrado com o CNPJ informado",
      });
    } else {
      const result = await prisma.invoice.create({
        data: {
          userId: invoice.userId,
          partnerId: invoice.partnerId,
          invoiceNumber: invoice.invoiceNumber,
          value: invoice.value,
          notes: invoice.notes,
        },
      });
      res.json(result);
    }
  }

  async function getAll() {
    const result = await prisma.invoice.findMany();
    res.json(result);
  }

  async function update(invoice: Invoice) {
    console.info("update");
    const result = await prisma.invoice.update({
      where: { id: invoice.id },
      data: {
        id: invoice.id,
        userId: invoice.userId,
        partnerId: invoice.partnerId,
        invoiceNumber: invoice.invoiceNumber,
        value: invoice.value,
        notes: invoice.notes,
      },
    });

    res.json(result);
  }
}
