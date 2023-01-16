import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.put(async (req, res) => {
  try {
    await prisma.Showroom.updateMany({
      data: {
        vat: Number(req.body.vat),
        discount: Number(req.body.discount)
      },
    });
    res.send("Vat and discount saved successfully");
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
