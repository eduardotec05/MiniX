import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const TweetComposer = ({ onTweet }) => {
  const [text, setText] = useState('');
  const { user, isAuthenticated } = useAuth();
  const inputRef = useRef(null);

  useEffect(() => {
    if (isAuthenticated) inputRef.current?.focus();
  }, [isAuthenticated]);

  const MAX_CHARS = 280;
  const remaining = MAX_CHARS - text.length;
  const percentage = (text.length / MAX_CHARS) * 100;

  const handleSubmit = useCallback(() => {
    if (!text.trim() || remaining < 0) return;
    onTweet(text.trim());
    setText('');
  }, [text, remaining, onTweet]);

  // Colores basados en el porcentaje de uso
  const getProgressColor = () => {
    if (percentage >= 100) return '#ef4444'; // Rojo cuando se pasa
    if (percentage > 90) return '#f97316'; // Naranja cuando está cerca
    return '#3b82f6'; // Azul por defecto
  };

  if (!isAuthenticated)
    return (
      <div className="border-b border-gray-200 p-6 bg-white text-center text-gray-500">
        Inicia sesión para crear un tweet
      </div>
    );

  return (
    <motion.div
      className="border-b border-gray-200 p-6 bg-white"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex gap-3">
        <div className="text-3xl">{user.avatar}</div>
        <div className="flex-1">
          <textarea
            ref={inputRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && e.ctrlKey && handleSubmit()}
            maxLength={MAX_CHARS}
            placeholder="¿Qué está pasando?"
            className="w-full resize-none outline-none text-lg bg-transparent"
            rows={3}
          />

          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2">
              {/* Círculo de progreso */}
              <div className="relative w-6 h-6">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  {/* Fondo del círculo */}
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="3"
                  />
                  {/* Barra de progreso */}
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke={getProgressColor()}
                    strokeWidth="3"
                    strokeDasharray={`${percentage}, 100`}
                    strokeLinecap="round"
                  />
                </svg>
                {/* Contador en el centro (opcional) */}
                {remaining < 100 && (
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                    {remaining}
                  </span>
                )}
              </div>

              {remaining < 20 && (
                <span className={`text-sm font-medium ${remaining < 0 ? 'text-red-500' : 'text-orange-500'}`}>
                  {remaining} caracteres restantes
                </span>
              )}
              <span className="text-xs text-gray-400">Ctrl+Enter para enviar</span>
            </div>
            <button
              disabled={!text.trim() || remaining < 0}
              onClick={handleSubmit}
              className="px-6 py-2 rounded-full font-bold text-white bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400"
            >
              Tweetear
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TweetComposer;