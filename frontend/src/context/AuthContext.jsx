import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/api';

// Creamos el contexto para manejar la autenticación en toda la app
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Al cargar, verificamos si hay una sesión activa en localStorage
    const token = localStorage.getItem('voxa_token');
    const storedUser = localStorage.getItem('voxa_user');
    if (token && storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Intentamos iniciar sesión con el servicio de API
      const data = await authService.login(email, password);
      localStorage.setItem('voxa_token', data.access_token);
      const userInfo = { email };
      setUser(userInfo);
      localStorage.setItem('voxa_user', JSON.stringify(userInfo));
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Credenciales inválidas' };
    }
  };

  const register = async (name, email, password) => {
    try {
      // Intentamos registrar al usuario en el backend
      await authService.register({ name, email, password });
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Error al registrar el usuario' };
    }
  };

  const logout = () => {
    // Limpiamos los datos del usuario y el token
    localStorage.removeItem('voxa_token');
    localStorage.removeItem('voxa_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
