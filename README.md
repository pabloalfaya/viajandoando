# Viajando Ando — web

Web estática con Astro de los viajes en grupo de Amalia. Sin frameworks de UI ni Tailwind: CSS propio con los tokens de `src/styles/tokens.css`, que salen de la paleta del logo.

## Comandos

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo (muestra también los viajes con `borrador: true`) |
| `npm run build` | Genera `dist/` |
| `npm run preview` | Sirve `dist/` en local |
| `npm run comprobar` | Revisa en `dist/` los enlaces a Glowi (rel/target, header/footer, precios) |
| `npm run verificar:glowi` | Comprueba que todas las URLs de Glowi responden 200 |
| `npm run medios` | Regenera recortes, logo en círculo, favicons e imagen Open Graph |

## Añadir un viaje

Crea `src/content/viajes/<slug>.md` siguiendo `marruecos.md`. El esquema está en `src/content.config.ts`. Si faltan fechas o precio, la página muestra «Fechas y precio muy pronto».

## Glowi (afiliación)

- Las URLs solo están en `src/config/glowi.ts`.
- Todo enlace a Glowi pasa por `EnlaceGlowi.astro`, que pone `target="_blank" rel="sponsored noopener"`.
- Glowi solo aparece en `/codigo-descuento-glowi/`, en la caja `<InternetViaje>` al final de cada viaje y en la pregunta 7 de la FAQ (como enlace interno). Nunca en la cabecera, el pie ni zonas comunes, y sin precios.

Datos pendientes: ver [TODO.md](./TODO.md).
