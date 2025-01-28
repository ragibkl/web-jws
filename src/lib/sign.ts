import forge from "node-forge";
import { Base64 } from "js-base64";

function b64UrltoB64(base64url: string): string {
  return base64url.replace(/-/g, "+").replace(/_/g, "/");
}

function b64ToB64Url(base64: string): string {
  return base64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function signMessage(privateKey: string, message: string) {
  const key = forge.pki.privateKeyFromPem(privateKey);

  const md = forge.md.sha256.create();
  md.update(message, "utf8");

  const pss = forge.pss.create({
    md: forge.md.sha256.create(),
    mgf: forge.mgf.mgf1.create(forge.md.sha256.create()),
    saltLength: 20,
  });

  const sign = key.sign(md, pss);
  return forge.util.encode64(sign);
}

export function signJWS(privateKey: string, header: string, payload: string) {
  const headerPart = Base64.encodeURL(JSON.stringify(JSON.parse(header)));
  const payloadPart = Base64.encodeURL(payload);

  const message = `${headerPart}.${payloadPart}`;
  const signature = signMessage(privateKey, message);
  const signPart = b64ToB64Url(signature);

  return `${headerPart}.${payloadPart}.${signPart}`;
}
