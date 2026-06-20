import React, { useState } from "react";

// ==========================================
// 1. TIPI E INTERFACCE (DATI DI PARTENZA)
// ==========================================
interface UserProfile {
  id: number;
  name: string;
  roles: ("USER" | "ADMIN" | "EDITOR")[];
  skills: string[];
}

const INITIAL_PROFILE: UserProfile = {
  id: 42,
  name: "Alessandro",
  roles: ["USER", "EDITOR"],
  skills: ["React", "TypeScript", "JavaScript"],
};

export default function ProfileManager() {
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);

  // ==========================================
  // 2. LE TUE FUNZIONI DA COMPLETARE 🛠️
  // ==========================================

  const promuoviAdAdmin = () => {
    setProfile((prev: UserProfile) => ({
      ...prev,
      roles: [...prev.roles, "ADMIN"],
    }));
  };

  const rimuoviUltimaSkill = () => {
    const ultimoIndice = profile.skills.length - 1;

    const skillsCopy = [...profile.skills];

    const newSkills = skillsCopy.splice(0, ultimoIndice);

    setProfile((user: UserProfile) => ({ ...user, skills: newSkills }));
  };

  const invertiOrdineRuoli = () => {
    const reversedRole = [...profile.roles];

    setProfile((user: UserProfile) => ({
      ...user,
      roles: reversedRole.reverse(),
    }));
  };

  // ==========================================
  // 3. INTERFACCIA VISIVA
  // ==========================================
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Profilo Utente: {profile.name}</h2>

      <div>
        <strong>Ruoli attuali:</strong>
        <ul>
          {profile.roles.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </div>

      <div>
        <strong>Competenze (Skills):</strong>
        <ul>
          {profile.skills.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>

      <hr />

      {/* Pulsanti per attivare le tue funzioni */}
      <button onClick={promuoviAdAdmin} style={{ marginRight: "10px" }}>
        👑 Diventa Admin (Task 1)
      </button>
      <button onClick={rimuoviUltimaSkill} style={{ marginRight: "10px" }}>
        ✂️ Rimuovi Ultima Skill (Task 2)
      </button>
      <button onClick={invertiOrdineRuoli}>
        🔄 Inverti Ordine Ruoli (Task 3)
      </button>
    </div>
  );
}
