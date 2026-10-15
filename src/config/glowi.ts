// ÚNICO sitio donde viven las URLs de Glowi. No escribas glowisim.com en ningún otro archivo:
// todo enlace pasa por <EnlaceGlowi> con rel="sponsored noopener".
// La comisión se cuenta por el código, no por el enlace.

const UTM = "utm_source=viajandoando&utm_medium=web&utm_campaign=afiliado";

export const GLOWI = {
  codigo: "VIAJANDOANDO",
  descuento: "10 %",
  home: `https://glowisim.com/?${UTM}`,
  compatibilidad: `https://glowisim.com/ayuda/dispositivos-compatibles?${UTM}`,
  // Verificadas el 15/10/2026. Añadir países SOLO tras comprobar que la URL responde 200
  // (ejecuta `npm run verificar:glowi`).
  paises: {
    marruecos: `https://glowisim.com/esim-marruecos?${UTM}`,
    turquia: `https://glowisim.com/esim-turquia?${UTM}`,
    egipto: `https://glowisim.com/esim-egipto?${UTM}`,
  } as Record<string, string>,
};

/** URL de la eSIM de un país, solo si está en la lista verificada. */
export const glowiPais = (paisSlug: string): string | null => GLOWI.paises[paisSlug] ?? null;
