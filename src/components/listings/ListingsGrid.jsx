import React, { useState, useMemo, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { filters } from '@/stores/filters.js';
import ListingCard from './ListingCard.jsx';
import amenitiesDirectory from '@/data/amenities-directory.json'; // Импортируем наш словарь

const ITEMS_PER_PAGE = 12;

export default function ListingsGrid({ allListings }) {
  const $filters = useStore(filters);
  
  const filteredListings = useMemo(() => {
    // Создаем поисковую строку в нижнем регистре для регистронезависимого поиска
    const searchTerm = $filters.searchTerm.toLowerCase();
    
    return allListings.filter(listing => {
      // --- СТАРЫЕ ФИЛЬТРЫ ---
      const regionMatch = $filters.region === 'Все' || listing.region === $filters.region;
      const typeMatch = $filters.type === 'Все' || listing.type === $filters.type;
      const guestMatch = $filters.guests === 0 || listing.sleeps >= $filters.guests;

      // --- НОВЫЕ ФИЛЬТРЫ ---
      
      // 1. Поиск по текстовому полю
      let searchMatch = true;
      if (searchTerm) {
        // Собираем весь текст, по которому можно искать, в одну строку
        const searchableText = [
          listing.name,
          listing.description,
          // Превращаем ключи удобств в их реальные названия
          ...(listing.amenities?.all?.map(key => amenitiesDirectory[key]?.name) || [])
        ].join(' ').toLowerCase();
        
        searchMatch = searchableText.includes(searchTerm);
      }
      
      // 2. Поиск по тегам-удобствам
      let amenitiesMatch = true;
      if ($filters.activeAmenities.length > 0) {
        // Проверяем, что ВСЕ активные теги присутствуют в списке удобств домика
        amenitiesMatch = $filters.activeAmenities.every(
          amenityKey => listing.amenities?.all?.includes(amenityKey)
        );
      }

      return regionMatch && typeMatch && guestMatch && searchMatch && amenitiesMatch;
    });
  }, [$filters, allListings]);

  // --- Логика пагинации (без изменений) ---
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [filteredListings]);
  const listingsToShow = filteredListings.slice(0, visibleCount);
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