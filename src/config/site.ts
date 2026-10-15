// Configuración general de la web. Los valores `null` son datos pendientes:
// cada uno tiene su TODO aquí y en /TODO.md. Mientras falten, la web usa
// alternativas razonables (p. ej. el enlace a Instagram sin usuario).

export const SITE = {
  nombre: "Viajando Ando",
  descripcion:
    "Viajes en grupo para gente que no se conoce: Marruecos y más destinos, con todo organizado. Desconocidos al salir, anécdotas al volver.",

  // TODO: dominio definitivo (con https:// y sin barra final). Afecta a canonical, sitemap y Open Graph.
  dominio: "https://dominio-pendiente.example",

  // TODO: usuario de Instagram de Amalia, sin la @ (p. ej. "viajandoando").
  instagram: null as string | null,

  // TODO: número de WhatsApp con prefijo y sin espacios ni + (p. ej. "34600000000").
  whatsapp: null as string | null,

  // TODO: email de contacto.
  email: null as string | null,

  // Dónde lleva el botón de reserva mientras no haya pasarela de pago.
  reservaVia: "instagram" as "instagram" | "whatsapp",

  // Crédito del pie. TODO: URL de la web de desarrollo de Pablo (nunca a Glowi, sin `sponsored`).
  credito: "Pablo",
  creditoUrl: null as string | null,
};

export const instagramUrl = SITE.instagram
  ? `https://www.instagram.com/${SITE.instagram}/`
  : "https://www.instagram.com/";

/** Mensaje directo de Instagram si hay usuario; si no, el perfil (o Instagram). */
export const instagramDmUrl = SITE.instagram ? `https://ig.me/m/${SITE.instagram}` : instagramUrl;

export const whatsappUrl = (texto?: string) =>
  SITE.whatsapp
    ? `https://wa.me/${SITE.whatsapp}${texto ? `?text=${encodeURIComponent(texto)}` : ""}`
    : null;

/** Enlace para reservar o preguntar por un viaje, según `reservaVia`. */
export function reservaUrl(viaje?: string) {
  if (SITE.reservaVia === "whatsapp") {
    const wa = whatsappUrl(viaje ? `¡Hola! Quiero apuntarme al viaje a ${viaje}.` : undefined);
    if (wa) return wa;
  }
  return instagramDmUrl;
}
