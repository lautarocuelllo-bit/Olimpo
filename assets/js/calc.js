// Funciones compartidas por las calculadoras

const fmt = (n, decimales = 0) =>
  n.toLocaleString("es-AR", {
    minimumFractionDigits: decimales,
    maximumFractionDigits: decimales,
  });

class ErrorDeCampo extends Error {}

// Lee un número de un input y verifica que esté dentro del rango.
// Si no es válido, marca el campo y lanza un ErrorDeCampo con el mensaje.
function leerNumero(id, min, max, nombre) {
  const input = document.getElementById(id);
  const valor = parseFloat(input.value.replace(",", "."));

  if (Number.isNaN(valor) || valor < min || valor > max) {
    input.setAttribute("aria-invalid", "true");
    input.focus();
    throw new ErrorDeCampo(`${nombre}: ingresá un valor entre ${min} y ${max}.`);
  }
  input.removeAttribute("aria-invalid");
  return valor;
}

function valorRadio(nombre) {
  return document.querySelector(`input[name="${nombre}"]:checked`).value;
}

// Conecta un formulario con su función de cálculo y maneja los errores.
function conectarCalculadora(formId, calcular) {
  const form = document.getElementById(formId);
  const error = document.getElementById("error");

  form.querySelectorAll("input").forEach((input) =>
    input.addEventListener("input", () => input.removeAttribute("aria-invalid"))
  );

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    error.textContent = "";
    form.querySelectorAll("[aria-invalid]").forEach((el) => el.removeAttribute("aria-invalid"));
    try {
      calcular();
      // En pantallas chicas el resultado queda debajo del formulario: lo llevamos a la vista
      const resultado = document.getElementById("resultado");
      if (resultado.getBoundingClientRect().top > window.innerHeight * 0.6) {
        const suave = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        resultado.scrollIntoView({ behavior: suave ? "smooth" : "auto", block: "start" });
      }
    } catch (err) {
      if (err instanceof ErrorDeCampo) {
        error.textContent = err.message;
      } else {
        throw err;
      }
    }
  });
}
