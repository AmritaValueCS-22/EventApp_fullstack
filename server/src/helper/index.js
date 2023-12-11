import crypto from "crypto";

function generateUniqueId() {
  return crypto.randomBytes(4).toString("hex").substring(0, 5);
}
export { generateUniqueId };
