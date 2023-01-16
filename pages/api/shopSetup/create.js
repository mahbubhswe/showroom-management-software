import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.post(async (req, res) => {
  try {
    await prisma.Showroom.deleteMany();
    await prisma.Showroom.create({
      data: {
        ...req.body,
      },
    });
    res.send("Shop's name and currency saved successfully");
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
