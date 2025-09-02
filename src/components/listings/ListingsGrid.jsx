import React, { useState, useMemo, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { filters } from '@/stores/filters.js';
import ListingCard from './ListingCard.jsx';
import amenitiesDirectory from '@/data/amenities-directory.json';

const ITEMS_PER_PAGE = 12;

const TIER_WEIGHTS = {
  premium: 3,
  basic: 2,
  free: 1,
  default: 1
};

export default function ListingsGrid({ allListings }) {
  const $filters = useStore(filters);

  // Вся логика фильтрации и сортировки находится здесь
  const filteredAndSortedListings = useMemo(() => {
    // ШАГ 1: ФИЛЬТРАЦИЯ
    const searchTerm = $filters.searchTerm.toLowerCase();
    const results = allListings.filter(listing => {
        const regionMatch = $filters.region === 'Все' || listing.region === $filters.region;
        const typeMatch = $filters.type === 'Все' || listing.type === $filters.type;
        const guestMatch = $filters.guests === 0 || listing.sleeps >= $filters.guests;
        
        let searchMatch = true;
        if (searchTerm) {
            const searchableText = [ listing.name, listing.description, ...(listing.amenities?.all?.map(key => amenitiesDirectory[key]?.name) || []) ].join(' ').toLowerCase();
            searchMatch = searchableText.includes(searchTerm);
        }
        
        let amenitiesMatch = true;
        if ($filters.activeAmenities.length > 0) {
            amenitiesMatch = $filters.activeAmenities.every( amenityKey => listing.amenities?.all?.includes(amenityKey));
        }
        return regionMatch && typeMatch && guestMatch && searchMatch && amenitiesMatch;
    });

    // ШАГ 2: СОРТИРОВКА
    results.sort((a, b) => {
      const weightA = TIER_WEIGHTS[a.listingTier] || TIER_WEIGHTS.default;
      const weightB = TIER_WEIGHTS[b.listingTier] || TIER_WEIGHTS.default;
      
      // Если тарифы разные, сортируем по ним
      if (weightB !== weightA) {
        return weightB - weightA;
      }
      
      // Если тарифы одинаковые, перемешиваем случайно
      return Math.random() - 0.5;
    });

    return results;

  }, [$filters, allListings]);

  // Логика пагинации, которая работает с отсортированным списком
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [filteredAndSortedListings]);

  const listingsToShow = filteredAndSortedListings.slice(0, visibleCount);
  
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
      
      {visibleCount < filteredAndSortedListings.length && (
        <div className="load-more-container">
          <button onClick={handleLoadMore} className="load-more-button">
            Показать еще
          </button>
        </div>
      )}
    </section>
  );
}