# OLYMPO

Calculadoras para progresar en el gimnasio: calorías, porcentaje de grasa corporal y repetición máxima (1RM), más una guía con lo básico para arrancar.

Fue **mi primera página web**. La empecé en 2024 mientras aprendía HTML, CSS y JavaScript, y en 2026 la retomé para terminarla. En el historial de commits se ve la versión original y todo lo que cambié después.

## Qué tiene

| Página | Qué hace |
| --- | --- |
| **Calorías** | Calcula el metabolismo basal con Mifflin-St Jeor o Harris-Benedict, el gasto diario según la actividad y las calorías y la proteína para definición, recomposición y volumen. |
| **Grasa corporal** | Estima el porcentaje de grasa con el método de la Marina de EE. UU. (en centímetros) y muestra en qué rango estás. |
| **1RM** | Estima la repetición máxima con 7 fórmulas (Epley, Brzycki, Lombardi, Mayhew, McGlothin, O'Conner y Wathan), las promedia y arma una tabla de cargas de 1 a 12 repeticiones. |
| **Consejos** | Sobrecarga progresiva, técnica de los ejercicios básicos, alimentación, descanso y constancia. |

## Qué cambió desde la versión original

- **Corregí la fórmula de grasa corporal.** Usaba los coeficientes para pulgadas con medidas en centímetros, y por eso daba unos 6 puntos de más (21,9 % en vez de 15,4 % con cintura 85, cuello 40 y altura 175).
- **El 1RM usa las 7 fórmulas que nombraba.** Antes explicaba siete y calculaba solo con Epley.
- **Las calculadoras validan los datos.** Antes se podían calcular calorías con campos vacíos o valores imposibles.
- **Un solo diseño para todo el sitio.** Cada página tenía su propio CSS. Ahora comparten una hoja de estilos con tema oscuro, se ven bien en el celular y tienen un menú común.
- **Agregué la página de consejos**, que el menú mencionaba pero no existía.
- Accesibilidad: etiquetas en todos los campos, foco visible, mensajes de error que se leen con lector de pantalla y navegación con teclado.

## Tecnologías

HTML, CSS y JavaScript, sin frameworks ni dependencias. Las fuentes son Anton e Inter, de Google Fonts.

## Cómo verla en tu compu

No necesita instalar nada. Abrí `index.html` en el navegador, o levantá un servidor local:

```bash
python -m http.server 8000
```

y entrá a <http://localhost:8000>.

## Estructura

```
├── index.html            Inicio
├── calorias.html
├── grasa-corporal.html
├── 1rm.html
├── consejos.html
└── assets/
    ├── css/styles.css    Estilos compartidos
    ├── js/
    │   ├── nav.js        Menú en celulares
    │   ├── calc.js       Validación y formato comunes
    │   ├── calorias.js
    │   ├── grasa-corporal.js
    │   └── 1rm.js
    └── img/
```

---

Hecho por Lautaro Cuello · [Genesis CodeStudio](https://genesiscodestudio.com)
