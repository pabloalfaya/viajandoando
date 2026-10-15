// Prepara los derivados de los originales (se ejecuta a mano: `npm run medios`).
// - recorte de la foto de la puerta para que Amalia sea el foco (y no la señora sentada)
// - logo recortado en círculo (sin redibujar ni recolorear) y favicons
// - imagen Open Graph de 1200×630 con el logo y la foto de la medina
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ruta = (rel) => fileURLToPath(new URL(rel, import.meta.url));
const CREMA = "#F6EADC";
const ROJO = "#D11E12";

// Foto de la puerta: recorte centrado en Amalia
await sharp(ruta("../src/assets/fotos/amalia-puerta-mezquita.jpg"))
  .extract({ left: 720, top: 820, width: 816, height: 1150 })
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(ruta("../src/assets/fotos/amalia-puerta-mezquita-recorte.jpg"));

// Logo en círculo con fondo transparente (el círculo ocupa todo el cuadrado de 1080 px)
const original = sharp(ruta("../src/assets/marca/logo-original.jpg"));
const { width: L } = await original.metadata();
const mascara = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${L}" height="${L}"><circle cx="${L / 2}" cy="${L / 2}" r="${L / 2 - 1}" fill="#000"/></svg>`);
const logoCirculo = await original.clone().ensureAlpha().composite([{ input: mascara, blend: "dest-in" }]).png().toBuffer();
await sharp(logoCirculo).toFile(ruta("../src/assets/marca/logo-circular.png"));

// Favicons
await sharp(logoCirculo).resize(32, 32).png().toFile(ruta("../public/favicon-32.png"));
await sharp(logoCirculo).resize(192, 192).png().toFile(ruta("../public/icon-192.png"));
await sharp(logoCirculo).resize(512, 512).png().toFile(ruta("../public/icon-512.png"));
// iOS no admite transparencia: círculo sobre crema
await sharp({ create: { width: 180, height: 180, channels: 4, background: CREMA } })
  .composite([{ input: await sharp(logoCirculo).resize(168, 168).toBuffer(), left: 6, top: 6 }])
  .png()
  .toFile(ruta("../public/apple-touch-icon.png"));
// favicon.ico (PNG embebido de 32 px)
const png32 = await sharp(logoCirculo).resize(32, 32).png().toBuffer();
const cab = Buffer.alloc(22);
cab.writeUInt16LE(0, 0); cab.writeUInt16LE(1, 2); cab.writeUInt16LE(1, 4);
cab.writeUInt8(32, 6); cab.writeUInt8(32, 7); cab.writeUInt8(0, 8); cab.writeUInt8(0, 9);
cab.writeUInt16LE(1, 10); cab.writeUInt16LE(32, 12); cab.writeUInt32LE(png32.length, 14); cab.writeUInt32LE(22, 18);
await import("node:fs/promises").then((fs) => fs.writeFile(ruta("../public/favicon.ico"), Buffer.concat([cab, png32])));

// Open Graph 1200×630: crema, logo a la izquierda, foto de la medina en arco a la derecha, círculo rojo
const foto = await sharp(ruta("../src/assets/fotos/amalia-medina-marrakech.jpg"))
  .extract({ left: 260, top: 520, width: 1000, height: 1125 })
  .resize(480, 540)
  .composite([{ input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="480" height="540"><path d="M0 540V240A240 240 0 0 1 480 240V540Z" fill="#000"/></svg>`), blend: "dest-in" }])
  .png()
  .toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 4, background: CREMA } })
  .composite([
    { input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><circle cx="1110" cy="110" r="70" fill="${ROJO}"/></svg>`), left: 0, top: 0 },
    { input: await sharp(logoCirculo).resize(500, 500).toBuffer(), left: 70, top: 65 },
    { input: foto, left: 650, top: 90 },
  ])
  .flatten({ background: CREMA })
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile(ruta("../public/og/viajando-ando.jpg"));

console.log("Medios preparados.");
