// Comprueba que todas las URLs de src/config/glowi.ts responden 200.
// Uso: npm run verificar:glowi  (sale con código 1 si alguna falla)
import { readFile } from "node:fs/promises";

const fuente = await readFile(new URL("../src/config/glowi.ts", import.meta.url), "utf8");
const utm = fuente.match(/const UTM = "([^"]+)"/)?.[1];
if (!utm) throw new Error("No encuentro la constante UTM en glowi.ts");

const urls = [...fuente.matchAll(/`(https:\/\/glowisim\.com[^`]*)`/g)].map((m) =>
  m[1].replace("${UTM}", utm),
);

let fallos = 0;
for (const url of urls) {
  try {
    const res = await fetch(url, { redirect: "manual", headers: { "user-agent": "Mozilla/5.0 (verificar-glowi)" } });
    const ok = res.status === 200;
    if (!ok) fallos++;
    console.log(`${ok ? "OK " : "ERR"} ${res.status}  ${url}`);
  } catch (e) {
    fallos++;
    console.log(`ERR ---  ${url}  (${e.message})`);
  }
}

console.log(`\n${urls.length - fallos}/${urls.length} URLs responden 200.`);
if (fallos) process.exit(1);
