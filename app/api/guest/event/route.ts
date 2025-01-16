import { type NextRequest } from "next/server";
import { buildDirectHttpsEventUrl, buildDirectHttpsUrl } from "@/utils/stringHelpers";
import { StreamDirectMessageEvent } from "@/types/DirectHttpsRequestTypes";
import { DummyGenerator } from "@/utils/generator";

// export const dynamic = "force-static";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const bid = searchParams.get("bid") || "";
  const type = searchParams.get("type") || "VIEW";

  /**
   * build page view event and add to request as message parameter
   *  ref: https://doc.sitecore.com/cdp/en/developers/api/sending-events-1166442.html
   */
  const baseUrl = buildDirectHttpsUrl("event");
  const evt: StreamDirectMessageEvent = {
    channel: DummyGenerator.getRandomChannelValue(), // randomly picks a channel from the list
    type,
    language: "EN",
    currency: "USD",
    page: DummyGenerator.getRandomPageValue(), // randomly picks a page from the list
    pos: process.env.NEXT_PUBLIC_ENGAGE_POS || "",
    browser_id: bid,
  };
  const requestUrl = buildDirectHttpsEventUrl(baseUrl, evt);

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const res = await fetch(requestUrl, {
    headers: headers,
  });
  const data = await res.json();

  return Response.json(data);
}
