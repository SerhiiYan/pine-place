import React, { useState } from 'react';
import { useStore } from '@nanostores/react';
import { filters, resetRegionFilters } from '@/stores/filters.js';
import amenitiesDirectory from '@/data/amenities-directory.json';
import Icon from '@/components/common/Icon.jsx';

// В этой версии мы НЕ ИСПОЛЬЗУЕМ ПОРТАЛЫ, так как z-index будет исправлен другим способом

export default function FiltersModal({ onClose }) {
  const $filters = useStore(filters);

  // --- ЛОГИКА "ЧЕРНОВИКА" (без изменений) ---
  const [draftAmenities, setDraftAmenities] = useState($filters.activeAmenities);

  const handleAmenityToggle = (amenityKey) => {
    setDraftAmenities(current => 
      current.includes(amenityKey)
        ? current.filter(key => key !== amenityKey)
        : [...current, amenityKey]
    );
  };

  const applyFilters = () => {
    filters.setKey('activeAmenities', draftAmenities);
    onClose();
  };

  const resetFilters = () => {
    setDraftAmenities([]); 
    resetRegionFilters();
  };
  
    const groupedAmenities = Object.entries(amenitiesDirectory).reduce((groups, [key, data]) => {
    const category = data.category || 'Прочее';
    if (!groups[category]) { groups[category] = []; }
    groups[category].push({ key, ...data });
    return groups;
  }, {});

  return (
    <div className="filters-modal-backdrop" onClick={onClose}>
      <div className="filters-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Фильтры</h2>
          <button className="modal-close-btn" onClick={onClose}>
            <Icon name="md:close" />
          </button>
        </div>
        
        <div className="modal-body">
          {Object.entries(groupedAmenities).map(([category, amenities]) => (
            <div key={category} className="category-group">
              <h3>{category}</h3>
              <div className="checkbox-grid">
                {amenities.map(amenity => (
                  <label key={amenity.key} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={draftAmenities.includes(amenity.key)}
                      onChange={() => handleAmenityToggle(amenity.key)}
                    />
                    <span className="custom-checkbox">
                      <Icon name="md:check" className="icon" color="white" />
                    </span>
                    <Icon name={amenity.icon} />
                    <span>{amenity.name}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="modal-footer">
          <button className="reset-btn" onClick={resetFilters}>Сбросить</button>
          <button className="show-results-btn" onClick={applyFilters}>
            Показать
          </button>
        </div>
      </div>
    </div>
  );
}