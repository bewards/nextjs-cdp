import { IPageViewEventInput } from "@sitecore/engage";

export type StreamDirectMessageEvent = IPageViewEventInput & {
  [key: string]: string | number | Array<string> | Array<number>;
};
