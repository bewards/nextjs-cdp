import path from "path";
import { promises as fs } from "node:fs";

export async function GET(_request: Request) {
  const filePath = path.join(process.cwd(), "app/data/products.json");
  const jsonData = await fs.readFile(filePath, "utf-8");
  const data = JSON.parse(jsonData);

  return Response.json(data);
}
