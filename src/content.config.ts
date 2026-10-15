// Colección de viajes: añadir un viaje = crear un archivo en src/content/viajes/.
// (Astro 5+ exige que la configuración viva en src/content.config.ts con un loader;
// el esquema es el del encargo, con tres campos opcionales extra al final.)
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const viajes = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/viajes" }),
  schema: ({ image }) =>
    z.object({
      titulo: z.string(), // "Marruecos"
      codigo: z.string(), // "VA 001"
      pais: z.string(), // "Marruecos" (nombre visible)
      paisSlug: z.string(), // "marruecos" → decide la caja de internet
      lugar: z.string(), // "Marrakech · Desierto de Agafay"
      frase: z.string(), // "6 días. 12 desconocidos. Marruecos."
      cita: z.string(),
      fechaInicio: z.coerce.date().optional(),
      fechaFin: z.coerce.date().optional(),
      plazas: z.number().optional(),
      precio: z.number().optional(),
      deposito: z.number().optional(),
      estado: z.enum(["abierto", "pocas-plazas", "completo", "proximamente"]),
      portada: image(),
      galeria: z.array(image()).default([]),
      incluye: z.array(z.string()),
      noIncluye: z.array(z.string()),
      alojamiento: z.string().optional(),
      itinerario: z.array(z.object({ dia: z.string(), titulo: z.string(), texto: z.string() })),
      faq: z.array(z.object({ p: z.string(), r: z.string() })).default([]),
      borrador: z.boolean().default(false),

      // Extras opcionales
      descripcion: z.string().optional(), // meta description de la página del viaje
      actividades: z
        .array(z.object({ icono: z.enum(["quad", "camello", "medina", "cascada", "te", "estrellas", "playa", "montana", "ciudad"]), texto: z.string() }))
        .default([]),
      video: z.object({ src: z.string(), poster: image(), alt: z.string() }).optional(),
    }),
});

export const collections = { viajes };
