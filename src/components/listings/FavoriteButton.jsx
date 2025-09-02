// src/components/listings/FavoriteButton.jsx
import React, { useState, useEffect } from 'react'; // 1. Импортируем useState и useEffect
import { useStore } from '@nanostores/react';
import { favoriteSlugs, toggleFavorite } from '@/stores/favorites.js';

export default function FavoriteButton({ slug }) {
  // 2. Добавляем состояние, чтобы отслеживать, когда компонент "смонтировался" в браузере
  const [isClient, setIsClient] = useState(false);

  // 3. Этот хук выполнится ТОЛЬКО в браузере ПОСЛЕ первого рендера
  useEffect(() => {
    setIsClient(true);
  }, []); // Пустой массив зависимостей = выполнить один раз

  const $favoriteSlugs = useStore(favoriteSlugs);

  // 4. Используем наше новое состояние 'isClient' для определения состояния кнопки
  //    На сервере и при первом рендере кнопка ВСЕГДА будет неактивной
  const isFavorited = isClient && $favoriteSlugs.includes(slug);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(slug);
  };

  return (
    <>
      <style>{`
        /* Стили остаются без изменений */
        .favorite-btn { flex-shrink: 0; background: rgba(0, 0, 0, 0.35); border-radius: 50%; border: none; color: white; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; padding: 0; z-index: 3; }
        .favorite-btn:hover { background: #2c3e3a; transform: scale(1.2); }
        .favorite-btn svg { width: 20px; height: 20px; }
        .favorite-btn.is-favorited { background: transparent; color: #E53935; }
        .favorite-btn.is-favorited:hover { background: rgba(229, 57, 53, 0.1); transform: scale(1.2); }
      `}</style>

      {/* 
        Здесь мы используем 'isFavorited', которое гарантированно будет `false`
        при первом рендере на клиенте, что обеспечивает совпадение с сервером.
      */}
      <button 
        className={`favorite-btn ${isFavorited ? 'is-favorited' : ''}`} 
        aria-label="Добавить в избранное" 
        onClick={handleFavoriteClick}
      >
        {isFavorited ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
        )}
      </button>
    </>
  );
}