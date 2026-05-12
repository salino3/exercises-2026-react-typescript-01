import { useActionState } from "react";

// 1. Definimos el tipo de nuestro estado
interface FormState {
  success: boolean;
  message: string;
}

// 2. Función asíncrona de frontend (por ejemplo, registrar un usuario)
async function registrarUsuario(
  prevState: FormState | null,
  formData: FormData,
): Promise<FormState> {
  const email = formData.get("email");

  // Simulamos una petición API (frontend tradicional)
  await new Promise((resolve) => setTimeout(resolve, 2000));

  if (!email || !email.toString().includes("@")) {
    return { success: false, message: "El correo no es válido." };
  }

  return { success: true, message: "¡Usuario registrado con éxito!" };
}

export const FormularioRegistro = () => {
  // useActionState recibe: (función, estadoInicial)
  // Devuelve: [estadoActual, disparadorFormulario, isPending]
  const [state, formAction, isPending] = useActionState(registrarUsuario, null);

  return (
    <form
      action={formAction}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        maxWidth: "300px",
      }}
    >
      <label>Email:</label>
      <input type="email" name="email" required />

      <button type="submit" disabled={isPending}>
        {isPending ? "Enviando..." : "Registrarse"}
      </button>

      {state && (
        <p style={{ color: state.success ? "green" : "red" }}>
          {state.message}
        </p>
      )}
    </form>
  );
};
