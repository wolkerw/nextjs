import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { maxNumber } = req.query;
    const maxNumberAux: number =
      maxNumber && !Array.isArray(maxNumber) ? parseInt(maxNumber) : 10;

    const randomNum = Math.floor(Math.random() * maxNumberAux) + 1;

    res.status(200).json(randomNum);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
