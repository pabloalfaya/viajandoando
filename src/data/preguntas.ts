// Preguntas frecuentes de la home (texto de Amalia). `r` admite HTML sencillo;
// para el JSON-LD se usa la versión sin etiquetas.

export const PREGUNTAS = [
  {
    p: "¿Tengo que conocer a alguien para apuntarme?",
    r: "¡Para nada! De hecho, esa es parte de la magia. Puedes venir sin conocer a nadie y compartir la aventura con personas que están en la misma situación que tú. ¿Quién sabe? Igual llegas sin conocer a nadie y vuelves con amigos para toda la vida.",
  },
  {
    p: "¿Qué incluye el precio del viaje?",
    r: "Depende del destino y de la aventura que vayamos a vivir. En cada viaje encontrarás toda la información sobre lo que está incluido y lo que tendrás que pagar por tu cuenta. Eso sí, hay algo que nunca está incluido: los vuelos ✈️. Algunas comidas tampoco estarán incluidas, así que revisa bien los detalles de cada viaje antes de lanzarte a la aventura.",
  },
  {
    p: "¿Y si soy tímida/o y me da vergüenza ir sin conocer a nadie?",
    r: "¡Que levante la mano quien no haya sentido esos nervios alguna vez! Es completamente normal. No tienes que ser la persona más extrovertida del planeta ni caerle bien a todo el mundo en cinco minutos. Ven como eres, disfruta a tu ritmo y deja que las cosas fluyan.",
  },
  {
    p: "¿Y si voy y me entran ganas de repetir?",
    r: "Pues tenemos un pequeño problema… ¡porque esto engancha! Si vuelves con ganas de más, podrás estar pendiente de las próximas aventuras. Nuevos destinos, nuevas personas y más historias que contar. Aunque te aviso: igual acabas mirando el calendario para ver cuándo te puedes escapar otra vez.",
  },
  {
    p: "¿Puedo apuntarme aunque viaje sola/o y no tenga experiencia?",
    r: "¡Por supuesto! No necesitas un grupo de amigos organizado ni ser una persona experta en viajar con veinte países a tus espaldas. Solo necesitas ganas de descubrir, conocer gente y vivir algo diferente. Lo demás lo iremos resolviendo por el camino.",
  },
  {
    p: "¿Y si me apunto y después no puedo ir?",
    r: "La vida a veces se tuerce y los planes cambian. Si te surge un imprevisto, tendrás que consultar las condiciones de cancelación y los posibles reembolsos de ese viaje, ya que pueden variar según la reserva. Por eso, antes de apuntarte, ¡mejor echarle un ojo a las condiciones y evitar sorpresas!",
  },
  {
    p: "¿Cómo tendré internet en el viaje?",
    // Enlace interno, nunca directo a Glowi.
    r: 'Te lo cuento todo en <a href="/internet-en-el-viaje/">Internet en el viaje</a>.',
  },
];

export const sinEtiquetas = (html: string) => html.replace(/<[^>]+>/g, "");

export const faqJsonLd = (preguntas: { p: string; r: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: preguntas.map(({ p, r }) => ({
    "@type": "Question",
    name: p,
    acceptedAnswer: { "@type": "Answer", text: sinEtiquetas(r) },
  })),
});
