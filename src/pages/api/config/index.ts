/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
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

  async function addItem(config: any) {
    try {
      const configByCNPJ = await prisma.config.findFirst({
        where: { name: config.name },
      });

      if (configByCNPJ) {
        res.status(409).json({
          ok: false,
          status: 409,
          statusText: "Já existe um parceiro cadastrado com o CNPJ informado",
        });
      } else {
        const result = await prisma.config.create({
          data: {
            ...config
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
      const result = await prisma.config.findMany();
      res.json(result);
    } catch (error) {
      res.status(500).json({
        ok: false,
        status: 500,
        statusText: error.message,
      });
    }
  }

  async function update(config: any) {
    try {
      const result = await prisma.config.update({
        where: { id: config.id },
        data: {
          ...config
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
