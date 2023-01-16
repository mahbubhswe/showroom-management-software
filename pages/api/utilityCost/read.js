import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.get(async (req, res) => {
  try {
    const Showroom = await prisma.Showroom.findFirst({
      select: {
        currency: true,
      },
    });
    const utilityCost = await prisma.UtilityCost.findMany();
    res.send({ utilityCost, currency: Showroom.currency });
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
