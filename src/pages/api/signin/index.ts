import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;

  const usrByEmail = await prisma.user.findFirst({
    where: { email: email },
  });

  const notFoundRes = () =>
    res.status(400).json({
      ok: false,
      status: 400,
      statusText: "Email ou senha inválidos",
    });

  if (usrByEmail) {
    const isMatch = await bcrypt.compare(password, usrByEmail.password);
    if (isMatch) {
      res.json({
        token: jwt.sign(
          {
            id: usrByEmail.id,
            name: usrByEmail.name,
            email: usrByEmail.email,
          },
          process.env.JWT_KEY
        ),
        user: {
          name: usrByEmail.name,
          email: usrByEmail.email,
        },
      });
    } else {
      notFoundRes();
    }
  } else {
    notFoundRes();
  }
}
