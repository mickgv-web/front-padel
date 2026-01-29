const API_URL = import.meta.env.VITE_API_URL;

export async function login(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });
  
  if (!res.ok) {
    throw new Error("Credenciales incorrectas");
  }

  return await res.json(); // { access_token, user }
}

export async function register(form) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(form)
  });

  if (!res.ok) {
    throw new Error("Error en el registro");
  }

  return await res.json();
}
