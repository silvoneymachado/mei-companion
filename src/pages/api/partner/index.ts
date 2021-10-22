import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { Partner } from "../../../util/models";
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

  async function addItem(partner: Partner) {
    const partnerByCNPJ = await prisma.partner.findFirst({
      where: { cnpj: partner.cnpj },
    });

    if (partnerByCNPJ) {
      res.status(409).json({
        ok: false,
        status: 409,
        statusText: "Já existe um parceiro cadastrado com o CNPJ informado",
      });
    } else {
      const result = await prisma.partner.create({
        data: {
          name: partner.name,
          cnpj: partner.cnpj,
          corporateName: partner.corporateName,
          userId: partner.userId,
        },
      });
      res.json(result);
    }
  }

  async function getAll() {
    const result = await prisma.partner.findMany();
    res.json(result);
  }

  async function update(partner: Partner) {
    console.info("update");
    const result = await prisma.partner.update({
      where: { id: partner.id },
      data: {
        name: partner.name,
        cnpj: partner.cnpj,
        corporateName: partner.corporateName,
        userId: partner.userId,
        id: partner.id,
      },
    });

    res.json(result);
  }
}
