import React, { useState } from "react";

export const MonitorDeCarga: React.FC = () => {
  const [exitos, setExitos] = useState(0);
  const [errores, setErrores] = useState(0);
  const [cargando, setCargando] = useState(false);

  // Funciones que devuelven promesas
  const conectarBD = () => Promise.resolve("BD Conectada");
  const conectarAuth = () => Promise.reject(new Error("Fallo de Auth"));
  const conectarCache = () => Promise.resolve("Cache Lista");

  const iniciarSistema = async () => {
    // Reset values
    setExitos(0);
    setErrores(0);
    setCargando(true);

    const tareas = [conectarBD(), conectarAuth(), conectarCache()];

    const resultados = await Promise.allSettled(tareas);

    resultados.forEach((res) => {
      if (res.status === "fulfilled") {
        setExitos((prev) => prev + 1);
      } else {
        setErrores((prev) => prev + 1);
      }
    });

    setCargando(false);
  };

  return (
    <div
      style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}
    >
      <h2>Estado del Sistema</h2>

      <div style={{ marginBottom: "15px" }}>
        <p>
          ✅ Módulos Activos: <strong>{exitos}</strong>
        </p>
        <p>
          ❌ Módulos Fallidos: <strong>{errores}</strong>
        </p>
      </div>

      <button
        onClick={iniciarSistema}
        disabled={cargando}
        style={{ padding: "10px 20px", cursor: "pointer" }}
      >
        {cargando ? "Cargando..." : "Reintentar Conexiones"}
      </button>

      {exitos + errores > 0 && !cargando && (
        <p style={{ marginTop: "10px", color: "#666" }}>
          Total procesado: {exitos + errores} módulos.
        </p>
      )}
    </div>
  );
};
