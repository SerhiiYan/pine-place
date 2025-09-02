// src/components/listings/FavoritesGrid.jsx
import React, { useState, useEffect, useMemo } from 'react'; // 1. Добавляем useState, useEffect, useMemo
import { useStore } from '@nanostores/react';
import { favoriteSlugs } from '@/stores/favorites.js';
import ListingCard from './ListingCard.jsx';

export default function FavoritesGrid({ allListings }) {
  // 2. Добавляем состояние для отслеживания монтирования в браузере
  const [isClient, setIsClient] = useState(false);

  // 3. Устанавливаем isClient в true только ПОСЛЕ первого рендера
  useEffect(() => {
    setIsClient(true);
  }, []);

  const $favoriteSlugs = useStore(favoriteSlugs);
  
  // 4. Используем useMemo для безопасного вычисления списка избранного
  const favoriteListings = useMemo(() => {
    // Если мы на сервере или это первый рендер на клиенте, всегда возвращаем пустой массив
    if (!isClient) {
      return [];
    }
    // Только когда isClient === true, мы можем безопасно фильтровать по данным из localStorage
    return allListings.filter(listing => 
      $favoriteSlugs.includes(listing.slug)
    );
  }, [isClient, $favoriteSlugs, allListings]); // Зависимости для пересчета

  // Теперь эта логика будет работать корректно
  if (favoriteListings.length === 0) {
    // Это условие будет true на сервере и при первом рендере на клиенте
    return (
      <div className="no-results-placeholder">
        <h3>Здесь пока пусто</h3>
        <p>Нажимайте на сердечко в карточках домиков, чтобы добавить их сюда.</p>
      </div>
    );
  }

  return (
    <div className="listings-grid">
      {favoriteListings.map(listing => (
        <ListingCard key={listing.slug} listing={listing} />
      ))}
    </div>
  );
}