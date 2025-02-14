import 'node:fs';
import { readFileSync, writeFileSync } from 'node:fs';
let encoded = readFileSync("decrypted.html");
let counter = new Uint8Array([
    211, 165, 130, 105, 174,
    195, 233,  67, 222, 222,
    130,  77, 118,  80, 254,
    109
]);
let key = await globalThis.crypto.subtle.generateKey(
    {
      name: "AES-CTR",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"],
  );
  
let ciphertext = await globalThis.crypto.subtle.encrypt(
    {
        name: "AES-CTR",
        counter,
        length: 64
    },
    key,
    encoded
);
let rawkey=await globalThis.crypto.subtle.exportKey("raw",key);
console.log("/more.html?k="+Buffer.from(rawkey).toString('base64url'));
writeFileSync("encrypted_more",Buffer.from(ciphertext));
writeFileSync("key",Buffer.from(rawkey).toString('base64url'));