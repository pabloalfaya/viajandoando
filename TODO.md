# TODO — datos pendientes antes de publicar

Mientras falten estos datos, la web funciona con alternativas: «Fechas y precio muy pronto», el CTA «Avísame por Instagram», el enlace a instagram.com sin usuario y el crédito «Diseño web: Pablo» sin enlace.

## Configuración (`src/config/site.ts`)
- [ ] **Dominio** definitivo (`SITE.dominio`). Cámbialo también en `astro.config.mjs` (`DOMINIO`). Afecta a canonical, sitemap, robots.txt y Open Graph.
- [x] Instagram: viajandoand013 (hecho).
- [x] WhatsApp: +34 673 62 83 34 (hecho). Botón fijo abajo a la derecha en todas las páginas. Si se quiere que el botón «Reserva tu plaza» lleve a WhatsApp en vez de a Instagram: `SITE.reservaVia = "whatsapp"`.
- [ ] **Email** de contacto (`SITE.email`).
- [ ] **creditoUrl**: web de desarrollo de Pablo para el crédito del pie (sin `sponsored`, nunca a Glowi).

## Viajes a Marruecos (`src/content/viajes/`)
**VA 001 · 28 nov – 2 dic 2026** (`marruecos-noviembre.md`): 450 €; incluye transfers, alojamiento, algunas comidas, guías locales y sorpresas.
- [ ] `deposito` y `plazas` (si los hay) y `alojamiento` (dónde dormimos).
- [ ] **Itinerario y actividades siguen siendo de EJEMPLO** y se ven en la web con la marca «EJEMPLO — sustituir por el real».
- [ ] Qué comidas están incluidas y cuáles no.

**VA 002 · 4 – 9 dic 2026** (`marruecos-diciembre.md`): solo hay fechas.
- [ ] `precio` (y entonces `estado: abierto`), qué incluye (hoy pone «Te lo confirmo muy pronto»), itinerario, plazas y alojamiento.

**Los dos**
- [ ] Que Amalia confirme los requisitos de entrada (pasaporte) de la FAQ del viaje.
- [ ] `turquia.md` es un viaje de **prueba** (`borrador: true`): solo se ve con `npm run dev`. Bórralo o déjalo como borrador.

## Legales (`src/pages/aviso-legal.astro`, `privacidad.astro`)
- [ ] Titular, NIF y dirección. Hoy salen como «[pendiente: …]».
- [ ] Revisión por una persona experta en legal (condiciones de viaje combinado, cancelaciones…).

## Vercel
- [ ] Activar **Web Analytics** en el proyecto de Vercel (sin cookies). El script solo se incluye en los builds de Vercel.
- [ ] Conectar el dominio.

## Medios (revisar)
- [ ] La tabla del encargo no cuadraba con los archivos. Se han usado según su contenido real:
  - `23.28.41.jpeg` es la **puerta de la mezquita** (no el callejón). Se recorta para que la señora sentada no salga: `amalia-puerta-mezquita-recorte.jpg`.
  - `23.28.42.jpeg` es el **callejón de la medina con el gato** → foto de «Quién soy».
  - `23.28.47.jpeg` **no es el grupo**: es un retrato de perfil en una playa (`retrato-playa.jpg`). No se usa: ¿es Amalia? ¿Se quiere usar?
  - `23.28.47 (1).jpeg` **no es un duplicado**: es el grupo de 5 en Teguise → se usa en «Cómo son».
  - El vídeo de los camellos es **horizontal** (832×464), no vertical. La portada lo usa a sangre en todas las anchuras.
- [ ] Para un viaje que no sea a Marruecos, añadir fotos de ese destino (Turquía usa ahora una foto de Budapest, solo de prueba).

## Glowi
- [ ] Antes de añadir un país a `src/config/glowi.ts`, ejecutar `npm run verificar:glowi` (todas las URLs a 200).
