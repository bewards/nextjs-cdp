import { createHash } from "node:crypto";

export const hashText = (text: string, algo = "md5"): string => {
  const hashFunc = createHash(algo);
  hashFunc.update(text);
  return hashFunc.digest("hex");
};