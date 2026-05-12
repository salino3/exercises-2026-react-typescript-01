import { useFormStatus } from "react-dom";

// 1. Dos funciones de ejemplo para simular distintas acciones
async function procesarPago(formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  alert("Pago procesado");
}

async function eliminarCuenta(formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  alert("Cuenta eliminada");
}

// 2. Componente de Botón Reutilizable e Inteligente
function BotonDinamico() {
  const { pending, data, method, action } = useFormStatus();

  // Caso 1: Usando `data` igual que antes
  const numeroTarjeta = data?.get("numero_tarjeta");

  // Caso 2: Usando `method`
  // Si el formulario padre tuviera <form method="get">, esto valdría "get".
  // Por defecto con las funciones de React 19, vale "post".
  const esBusqueda = method === "get";

  // Caso 3: Usando `action`
  // Comparamos si la función que se está ejecutando es una u otra
  let textoBoton = "Enviar";
  let textoCargando = "Procesando...";

  if (action === procesarPago) {
    textoBoton = "Pagar ahora";
    textoCargando = `Pagando con tarjeta **** ${String(numeroTarjeta).slice(-4)}...`;
  } else if (action === eliminarCuenta) {
    textoBoton = "⚠️ Eliminar mi cuenta definitivamente";
    textoCargando = "Borrando datos de forma segura...";
  }

  return (
    <button
      type="submit"
      disabled={pending}
      style={{
        padding: "10px",
        backgroundColor: action === eliminarCuenta ? "#ff4d4d" : "#0070f3",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      {pending ? textoCargando : esBusqueda ? "🔍 Buscar" : textoBoton}
    </button>
  );
}

// 3. Componente Principal para probar ambos escenarios
export function VistaFormularios() {
  return (
    <div
      style={{
        fontFamily: "sans-serif",
        display: "flex",
        flexDirection: "column",
        gap: "40px",
        padding: "20px",
      }}
    >
      {/* FORMULARIO 1: Pasarela de Pago */}
      <div>
        <h3>Formulario de Pago</h3>
        <form
          action={procesarPago}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            maxWidth: "300px",
          }}
        >
          <input
            type="number"
            name="numero_tarjeta"
            placeholder="Número de tarjeta"
            required
          />
          {/* El botón detectará que la acción es 'procesarPago' */}
          <BotonDinamico />
        </form>
      </div>

      <hr />

      {/* FORMULARIO 2: Zona Peligrosa */}
      <div>
        <h3>Zona de Peligro</h3>
        <form
          action={eliminarCuenta}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            maxWidth: "300px",
          }}
        >
          <p style={{ fontSize: "14px", color: "gray" }}>
            Confirma tu contraseña para borrar la cuenta:
          </p>
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            required
          />
          {/* El MISMO botón detectará que la acción es 'eliminarCuenta' y cambiará a rojo */}
          <BotonDinamico />
        </form>
      </div>
    </div>
  );
}
