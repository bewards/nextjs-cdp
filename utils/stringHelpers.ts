import { md5 } from "js-md5";

export const hashText = (text: string): string => {
  // const hashFunc = createHash(algo);
  // hashFunc.update(text);
  // return hashFunc.digest("hex");

  const hash = md5.create();
  hash.update(text);
  return hash.hex();
};

export const buildDirectHttpsUrl = (action: string): string => {
  // <baseURL>/v1.2/browser/create.json?client_key=<client_key>
  return `${process.env.NEXT_PUBLIC_ENGAGE_TARGET_URL}/v1.2/${action}/create.json?client_key=${process.env.NEXT_PUBLIC_ENGAGE_CLIENT_KEY}`;
};

export const buildDirectHttpsEventUrl = (baseUrl: string, jsonMessage: Record<string, unknown>): string => {
  return `${baseUrl}&message=${JSON.stringify(jsonMessage)}`;
};
