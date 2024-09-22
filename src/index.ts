import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { getPhotos } from './photos';
import { createOrder, getOrders } from './orders';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/photos", async (req: Request, res: Response) => {
  const { q, limit } = req.query;

  try {
    const photoList = await getPhotos(q as string, Number(limit))
    res.json({ total: photoList.list?.length, photos: photoList });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/order", async (req: Request, res: Response) => {
  const { user } = req.query;
  try {
    return await getOrders(user as string);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/order", async (req: Request, res: Response) => {
  try {
    const { email, fullName, address, imageUrls, frameColor, user } = req.body;

    await createOrder({ email, fullName, address, imageUrls, frameColor, user });
    res.json({ email, fullName, address, imageUrls, frameColor, user });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

function createOrdersTable() {
  throw new Error('Function not implemented.');
}
