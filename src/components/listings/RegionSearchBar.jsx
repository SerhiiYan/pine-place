import React, { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { filters, resetRegionFilters } from '@/stores/filters.js';
import amenitiesDirectory from '@/data/amenities-directory.json';
import FiltersModal from './FiltersModal.jsx'; // <-- 1. ИМПОРТИРУЕМ МОДАЛЬНОЕ ОКНО
import Icon from '@/components/common/Icon.jsx'; 

// Хук для "отложенного" обновления поиска
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};

export default function RegionSearchBar() {
  const $filters = useStore(filters);
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(localSearchTerm, 300);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    filters.setKey('searchTerm', debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  const isFilterApplied = 
    $filters.searchTerm !== '' || 
    $filters.guests !== 0 || 
    $filters.type !== 'Все' || 
    $filters.activeAmenities.length > 0;
  
  const handleReset = () => {
    setLocalSearchTerm(''); // Сбрасываем текст в инпуте
    resetRegionFilters(); // Вызываем глобальный сброс
  };

  const handleFilterChange = (key, value) => {
    filters.setKey(key, value);
  };
  
  const handleAmenityToggle = (amenityKey) => {
    const currentAmenities = $filters.activeAmenities;
    const newAmenities = currentAmenities.includes(amenityKey)
      ? currentAmenities.filter(key => key !== amenityKey)
      : [...currentAmenities, amenityKey];
    filters.setKey('activeAmenities', newAmenities);
  };

  const guestOptions = [
    { value: 0, label: "Сколько гостей?" }, { value: 2, label: "2+ гостя" },
    { value: 4, label: "4+ гостя" }, { value: 6, label: "6+ гостей" },
  ];

  const typeOptions = [
    { value: "Все", label: "Тип жилья" }, { value: "A-frame", label: "A-frame" },
    { value: "Хижина", label: "Хижина" }, { value: "Коттедж", label: "Коттедж" },
    { value: "Barnhouse", label: "Barnhouse" },
  ];

  const filterableAmenities = Object.entries(amenitiesDirectory)
    .filter(([, value]) => value.isFilterable)
    .map(([key, value]) => ({ key, ...value }));

  return (
    <>
    <div className="region-search-container">
      <div className="main-search-bar">
        <input
          type="text"
          placeholder="Поиск по названию или удобствам (например, 'баня')"
          className="search-input"
          value={localSearchTerm}
          onChange={e => setLocalSearchTerm(e.target.value)}
        />
        <div className="dropdown-filters">
          <select value={$filters.guests} onChange={e => handleFilterChange('guests', Number(e.target.value))}>
            {guestOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
          <select value={$filters.type} onChange={e => handleFilterChange('type', e.target.value)}>
            {typeOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
          <button className="filters-btn" onClick={() => setIsModalOpen(true)}>
              <Icon name="md:tune" />
            </button>
          {isFilterApplied && (
              <button className="reset-btn-main" onClick={handleReset} title="Сбросить фильтры">
                <Icon name="md:close" />
              </button>
            )}
        </div>
      </div>

      <div className="amenity-pills">
        {filterableAmenities.map(amenity => (
          <button
            key={amenity.key}
            className={`pill-btn ${$filters.activeAmenities.includes(amenity.key) ? 'active' : ''}`}
            onClick={() => handleAmenityToggle(amenity.key)}
          >
            {amenity.name}
          </button>
        ))}
      </div>
    </div>
    {isModalOpen && <FiltersModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
}