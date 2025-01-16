import { buildDirectHttpsUrl } from "@/utils/stringHelpers";
import { cookies } from "next/headers";

export const dynamic = "force-static";

export async function GET(_request: Request) {
  const cookieStore = await cookies();
  const _token = cookieStore.get("token");

  const requestUrl = buildDirectHttpsUrl("browser");
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
//   if (process.env.DATA_API_KEY) {
//     headers.append("API-Key", process.env.DATA_API_KEY);
//   }

  const res = await fetch(requestUrl, {
    headers: headers,
  });
  const data = await res.json();

  return Response.json(data);
}
