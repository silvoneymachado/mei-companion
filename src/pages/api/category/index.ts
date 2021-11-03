import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { Category, User } from "../../../util/models";
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

  async function addItem(category: Category) {
    try {
      const categoryByCNPJ = await prisma.category.findFirst({
        where: { name: category.name },
      });

      if (categoryByCNPJ) {
        res.status(409).json({
          ok: false,
          status: 409,
          statusText: "Já existe um parceiro cadastrado com o CNPJ informado",
        });
      } else {
        const result = await prisma.category.create({
          data: {
            name: category.name,
            description: category.description,
            active: category.active,
            userId: category.userId,
          },
        });
        res.json(result);
      }
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
      const result = await prisma.category.findMany({
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

  async function update(category: Category) {
    try {
      const result = await prisma.category.update({
        where: { id: category.id },
        data: {
          id: category.id,
          name: category.name,
          description: category.description,
          active: category.active,
          userId: category.userId,
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
