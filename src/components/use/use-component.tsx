import { use, Suspense, useState } from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";

// 1. Definimos la interfaz de los datos
interface Tarea {
  id: number;
  title: string;
}

// Helper para hacer el fetch de forma limpia y manejar errores HTTP
const fetchTareas = (url: string): Promise<Tarea[]> => {
  return fetch(url).then((res) => {
    if (!res.ok) throw new Error(`Error de servidor: ${res.status}`);
    return res.json() as Promise<Tarea[]>;
  });
};

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const mensajeDeError = error instanceof Error ? error.message : String(error);
  return (
    <div
      style={{
        color: "red",
        border: "1px solid red",
        padding: "15px",
        borderRadius: "8px",
        margin: "10px 0",
      }}
    >
      <h4>¡Vaya! Algo salió mal al cargar las tareas.</h4>
      <p style={{ fontSize: "14px" }}>{mensajeDeError}</p>
      <button
        onClick={resetErrorBoundary}
        style={{
          padding: "8px 12px",
          cursor: "pointer",
          backgroundColor: "#fff",
          border: "1px solid red",
          borderRadius: "4px",
        }}
      >
        Intentar de nuevo
      </button>
    </div>
  );
}

// 3. Componente que consume la promesa con el nuevo hook `use`
interface ListaDeTareasProps {
  promise: Promise<Tarea[]>;
}

function ListaDeTareas({ promise }: ListaDeTareasProps) {
  // React pausará este componente si la promesa está pendiente.
  // Si la promesa falla, lanzará el error hacia el ErrorBoundary.
  const tareas = use(promise);

  return (
    <ul>
      {tareas.map((tarea) => (
        <li key={tarea.id} style={{ margin: "5px 0" }}>
          {tarea.title}
        </li>
      ))}
    </ul>
  );
}

// 4. Componente Padre Principal
export function AppTareas() {
  // Iniciamos con la URL que tiene la errata ("jsonplaceaholder") para forzar el error inicial
  const [tareasPromise, setTareasPromise] = useState(() =>
    fetchTareas("https://jsonplaceaholder.typicode.com/todos?_limit=5"),
  );

  // Esta función se ejecuta cuando el usuario le da a "Intentar de nuevo"
  const manejarReset = () => {
    // Corregimos la URL para que esta vez sí funcione
    setTareasPromise(
      fetchTareas("https://jsonplaceholder.typicode.com/todos?_limit=5"),
    );
  };

  return (
    <div
      style={{ fontFamily: "sans-serif", maxWidth: "400px", padding: "20px" }}
    >
      <h2>Mis Tareas Pendientes</h2>

      {/* El ErrorBoundary envuelve al Suspense */}
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={manejarReset}>
        <Suspense
          fallback={
            <p style={{ color: "gray" }}>Cargando tareas desde la API...</p>
          }
        >
          <ListaDeTareas promise={tareasPromise} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
