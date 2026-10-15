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

/** «12 – 17 de marzo de 2027», o null si faltan fechas. */
export function fechasTexto(v: Viaje["data"]): string | null {
  if (!v.fechaInicio) return null;
  if (!v.fechaFin) return fmtDiaAnio.format(v.fechaInicio);
  return `${fmtDia.format(v.fechaInicio)} – ${fmtDiaAnio.format(v.fechaFin)}`;
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
