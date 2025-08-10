// src/components/ListingsGrid.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { filters } from '@/stores/filters.js';
import ListingCard from './ListingCard.jsx';

const ITEMS_PER_PAGE = 12; // Задаем константу для удобства

export default function ListingsGrid({ allListings }) {
  const $filters = useStore(filters);
  
  // --- ШАГ 1: ЛОГИКА ФИЛЬТРАЦИИ (без изменений) ---
  const filteredListings = useMemo(() => {
    return allListings.filter(listing => {
      const regionMatch = $filters.region === 'Все' || listing.region === $filters.region;
      const typeMatch = $filters.type === 'Все' || listing.type === $filters.type;
      const guestMatch = $filters.guests === 0 || listing.sleeps >= $filters.guests;
      return regionMatch && typeMatch && guestMatch;
    });
  }, [$filters, allListings]);

  // --- ШАГ 2: ДОБАВЛЯЕМ СОСТОЯНИЕ ДЛЯ КОЛИЧЕСТВА ВИДИМЫХ КАРТОЧЕК ---
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  
  // --- ШАГ 3: СБРАСЫВАЕМ СЧЕТЧИК ПРИ ИЗМЕНЕНИИ ФИЛЬТРОВ ---
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [filteredListings]); // Запускаем этот эффект каждый раз, когда меняется отфильтрованный массив

  // --- ШАГ 4: СОЗДАЕМ МАССИВ ДЛЯ ОТОБРАЖЕНИЯ ---
  const listingsToShow = filteredListings.slice(0, visibleCount);

  // --- ШАГ 5: ФУНКЦИЯ ДЛЯ КНОПКИ "ПОКАЗАТЬ ЕЩЕ" ---
  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + ITEMS_PER_PAGE);
  };
  
  return (
    <section className="results-section">
      <div className="listings-grid">
        {listingsToShow.length > 0 ? (
          listingsToShow.map(listing => (
            <ListingCard key={listing.slug} listing={listing} />
          ))
        ) : (
          <p className="no-results">По вашему запросу ничего не найдено. Попробуйте изменить фильтры.</p>
        )}
      </div>
      
      {/* --- ШАГ 6: ДОБАВЛЯЕМ КНОПКУ, ЕСЛИ ЕСТЬ ЧТО ПОКАЗЫВАТЬ --- */}
      {visibleCount < filteredListings.length && (
        <div className="load-more-container">
          <button onClick={handleLoadMore} className="load-more-button">
            Показать еще
          </button>
        </div>
      )}
    </section>
  );
}

// ПРИМЕЧАНИЕ: Стили для этого компонента находятся в `index.astro`
// Мы добавим туда стили и для новой кнопки.