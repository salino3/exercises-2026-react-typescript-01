import { useFormStatus } from "react-dom"; //   React 19 se importa de 'react-dom'

// Componente Hijo: Un botón inteligente
function BotonEnviar() {
  // useFormStatus nos da el estado del formulario padre más cercano
  const { pending, data, method, action } = useFormStatus();
  // Si está cargando, podemos extraer lo que el usuario escribió
  const numeroTarjeta = data?.get("numero_tarjeta");

  return (
    <button type="submit" disabled={pending}>
      {pending
        ? `Procesando tarjeta que termina en ${String(numeroTarjeta).slice(-4)}...`
        : "Pagar ahora"}
    </button>
  );
}

// Componente Padre
export function FormularioPago() {
  async function procesarPago(formData: FormData) {
    await new Promise((resolve) => setTimeout(resolve, 3000)); // Simula pasarela de pago
    alert("Pago realizado");
  }

  return (
    <form action={procesarPago}>
      <input
        type="number"
        name="numero_tarjeta"
        placeholder="Número de tarjeta"
        required
      />

      {/* El botón sabe mágicamente si el formulario se está enviando */}
      <BotonEnviar />
    </form>
  );
}
