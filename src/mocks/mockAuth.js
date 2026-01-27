// src/mocks/mockAuth.js
export const mockAuth = {
  async login(email, password) {
    if (email === "admin@demo.com" && password === "admin") {
      return {
        user: { id: 1, nombre: "Admin Demo", rol: "ADMIN" }
      };
    }

    if (email === "user@demo.com" && password === "user") {
      return {
        user: { id: 2, nombre: "Usuario Demo", rol: "USER" }
      };
    }

    throw new Error("Credenciales incorrectas");
  },

  async register(form) {
    return {
      user: {
        id: Date.now(),
        nombre: form.nombre,
        rol: "USER"
      }
    };
  }
};
