import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import LoginModal from "./LoginModal";

const Navigation = ({ currentView, setCurrentView, onViewProfile }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-200">
        <nav className="max-w-4xl mx-auto flex items-center justify-between p-4">
          <button
            onClick={() => setCurrentView("home")}
            className="text-2xl font-extrabold text-blue-500 hover:text-blue-600"
          >
            MiniX
          </button>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setCurrentView("home")}
              className={`hover:text-blue-500 ${
                currentView === "home"
                  ? "font-bold text-blue-500"
                  : "text-gray-700"
              }`}
            >
              Inicio
            </button>
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onViewProfile(user.username)}
                  className={`hover:text-blue-500 ${
                    currentView === "profile"
                      ? "font-bold text-blue-500"
                      : "text-gray-700"
                  }`}
                >
                  {user.avatar} {user.username}
                </button>

                <button
                  onClick={logout}
                  className="px-4 py-1.5 text-sm bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  Salir
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="px-4 py-1.5 bg-blue-500 text-white rounded-full hover:bg-blue-600"
              >
                Iniciar Sesión
              </button>
            )}
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {showLoginModal && (
          <LoginModal isOpen onClose={() => setShowLoginModal(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
