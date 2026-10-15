// Comprobaciones de Glowi sobre el HTML generado (apartado 13). Uso: npm run comprobar (tras el build).
// 1) Todo <a> con href a glowisim.com lleva target="_blank" y rel="sponsored noopener".
// 2) Ningún enlace a glowisim.com dentro de <header> ni <footer>.
// 3) No hay precios de Glowi: ninguna cifra con «€» cerca de «eSIM».
// 4) glowisim.com solo aparece en /internet-en-el-viaje/ y en las páginas de viaje.
import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const DIST = fileURLToPath(new URL("../dist/", import.meta.url));

async function* html(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* html(p);
    else if (e.name.endsWith(".html")) yield p;
  }
}

const errores = [];
let enlaces = 0;
const paginasConGlowi = new Set();

for await (const archivo of html(DIST)) {
  const ruta = "/" + relative(DIST, archivo).replaceAll("\\", "/").replace(/index\.html$/, "");
  const src = await readFile(archivo, "utf8");

  for (const m of src.matchAll(/<a\b[^>]*href="[^"]*glowisim\.com[^"]*"[^>]*>/g)) {
    enlaces++;
    paginasConGlowi.add(ruta);
    const a = m[0];
    if (!/\brel="sponsored noopener"/.test(a)) errores.push(`${ruta}: enlace sin rel="sponsored noopener": ${a}`);
    if (!/\btarget="_blank"/.test(a)) errores.push(`${ruta}: enlace sin target="_blank": ${a}`);
  }
  for (const zona of ["header", "footer"]) {
    for (const m of src.matchAll(new RegExp(`<${zona}\b[\s\S]*?</${zona}>`, "g"))) {
      if (m[0].includes("glowisim.com")) errores.push(`${ruta}: glowisim.com dentro de <${zona}>`);
    }
  }
  const texto = src.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<style[\s\S]*?<\/style>/g, "").replace(/<[^>]+>/g, " ");
  for (const m of texto.matchAll(/esim/gi)) {
    const entorno = texto.slice(Math.max(0, m.index - 200), m.index + 200);
    if (/\d[\d.,\s]*€|€\s*\d/.test(entorno)) errores.push(`${ruta}: posible precio cerca de «eSIM»: …${entorno.replace(/\s+/g, " ").trim()}…`);
  }
  if (src.includes("glowisim.com") && !(ruta === "/internet-en-el-viaje/" || ruta.startsWith("/viajes/") && ruta !== "/viajes/")) {
    errores.push(`${ruta}: menciona glowisim.com fuera de las páginas permitidas`);
  }
}

console.log(`Enlaces a glowisim.com: ${enlaces} (en ${[...paginasConGlowi].join(", ") || "ninguna página"})`);
if (errores.length) {
  console.error(errores.map((e) => "ERR " + e).join("\n"));
  process.exit(1);
}
console.log("OK: rel/target correctos, nada en header/footer, sin precios cerca de «eSIM», Glowi solo donde toca.");
