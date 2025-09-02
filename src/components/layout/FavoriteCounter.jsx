// src/components/layout/FavoriteCounter.jsx
import React, { useState, useEffect } from 'react'; // 1. Импортируем useState и useEffect
import { useStore } from '@nanostores/react';
import { favoriteSlugs } from '@/stores/favorites.js';
import Icon from '@/components/common/Icon.jsx';

export default function FavoriteCounter() {
  // 2. Добавляем состояние, чтобы отслеживать, когда компонент "смонтировался" в браузере
  const [isClient, setIsClient] = useState(false);
  
  // 3. Этот хук выполнится ТОЛЬКО в браузере ПОСЛЕ первого рендера
  useEffect(() => {
    // Теперь мы можем безопасно сказать: "Да, мы в браузере"
    setIsClient(true);
  }, []); // Пустой массив зависимостей означает "выполнить один раз при монтировании"

  const $favoriteSlugs = useStore(favoriteSlugs);
  const count = $favoriteSlugs.length;

  // 4. Используем наше новое состояние isClient для условного рендеринга
  const finalCount = isClient ? count : 0;
  
  return (
    // В aria-label тоже используем finalCount, чтобы избежать несоответствия
    <a href="/favorites" className="favorite-counter" aria-label={`Избранное, ${finalCount} элементов`}>
      <Icon name="md:favoriteBorder" size="1.5rem" />
      
      {/* Рендерим кружок-счетчик только если мы на клиенте и count > 0 */}
      {isClient && count > 0 && (
        <span className="count-bubble">{count}</span>
      )}
    </a>
  );
}