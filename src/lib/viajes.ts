import { getCollection, type CollectionEntry } from "astro:content";

export type Viaje = CollectionEntry<"viajes">;

/** Viajes visibles: los borradores solo aparecen en desarrollo (`npm run dev`). */
export async function getViajes(): Promise<Viaje[]> {
  const todos = await getCollection("viajes", ({ data }) => import.meta.env.DEV || !data.borrador);
  return todos.sort((a, b) => {
    const fa = a.data.fechaInicio?.getTime() ?? Infinity;
    const fb = b.data.fechaInicio?.getTime() ?? Infinity;
    return fa - fb || a.data.codigo.localeCompare(b.data.codigo);
  });
}

const fmtDia = new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "long", timeZone: "UTC" });
const fmtDiaAnio = new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
const fmtCorto = new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "short", timeZone: "UTC" });

/** «28 de noviembre – 2 de diciembre de 2026» o «4 – 9 de diciembre de 2026»; null si faltan fechas. */
export function fechasTexto(v: Viaje["data"]): string | null {
  if (!v.fechaInicio) return null;
  if (!v.fechaFin) return fmtDiaAnio.format(v.fechaInicio);
  const mismoMes =
    v.fechaInicio.getUTCMonth() === v.fechaFin.getUTCMonth() &&
    v.fechaInicio.getUTCFullYear() === v.fechaFin.getUTCFullYear();
  if (mismoMes) return `${v.fechaInicio.getUTCDate()} – ${fmtDiaAnio.format(v.fechaFin)}`;
  return `${fmtDia.format(v.fechaInicio)} – ${fmtDiaAnio.format(v.fechaFin)}`;
}

/** «28 nov – 2 dic», para listas cortas (pie). */
export function fechasCortas(v: Viaje["data"]): string | null {
  if (!v.fechaInicio) return null;
  const corto = (d: Date) => fmtCorto.format(d).replace(".", "");
  if (!v.fechaFin) return corto(v.fechaInicio);
  if (v.fechaInicio.getUTCMonth() === v.fechaFin.getUTCMonth()) return `${v.fechaInicio.getUTCDate()} – ${corto(v.fechaFin)}`;
  return `${corto(v.fechaInicio)} – ${corto(v.fechaFin)}`;
}

export const tienePrecio = (v: Viaje["data"]) => typeof v.precio === "number" && v.precio > 0;
export const tieneFechas = (v: Viaje["data"]) => Boolean(v.fechaInicio);

export const euros = (n: number) =>
  new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

export const ESTADO: Record<Viaje["data"]["estado"], string> = {
  abierto: "Plazas abiertas",
  "pocas-plazas": "Quedan pocas plazas",
  completo: "Completo",
  proximamente: "Muy pronto",
};

export const PENDIENTE = "Fechas y precio muy pronto";

/** Texto para lo que aún falta (fechas, precio o ambos), o null si ya está todo. */
export function pendienteTexto(v: Viaje["data"]): string | null {
  const f = tieneFechas(v);
  const p = tienePrecio(v);
  if (f && p) return null;
  if (f) return "Precio muy pronto";
  if (p) return "Fechas muy pronto";
  return PENDIENTE;
}
