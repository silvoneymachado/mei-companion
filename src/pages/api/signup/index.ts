import prisma from "../../../lib/prisma";
import * as bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, email, cnpj, corporateName, phoneNumber, password } = req.body;
  const saltOrRounds = 10;
  const hash = await bcrypt.hash(password, saltOrRounds);

  const usrByEmail = await prisma.user.findFirst({
    where: { email: email },
  });

  const usrByCnpj = await prisma.user.findFirst({
    where: { cnpj: cnpj },
  });

  if (usrByEmail || usrByCnpj) {
    res.status(400).json({
        ok: false,
        status: 400,
        statusText: "Erro ao criar usuário: email ou cnpj já utilizados",
      });
  } else {
    const result = await prisma.user.create({
      data: {
        name,
        email,
        cnpj,
        corporateName,
        phoneNumber,
        password: hash,
      },
    });

    res.json(result);
  }
}
