import React from 'react';
import Icon from '@/components/common/Icon.jsx'; // <-- Импортируем НАШ компонент

export default function AmenitiesModal({ allAmenities, directory, onClose }) {
  // Группируем удобства по категориям (этот код без изменений)
  const groupedAmenities = allAmenities.reduce((groups, key) => {
    const amenity = directory[key];
    if (!amenity) return groups;
    const category = amenity.category || 'Прочее';
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(amenity);
    return groups;
  }, {});

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>&times;</button>
        <h2>Все удобства</h2>
        <div className="amenities-list">
          {Object.entries(groupedAmenities).map(([category, amenities]) => (
            <div key={category} className="category-group">
              <h3>{category}</h3>
              <ul>
                {amenities.map(amenity => (
                  <li key={amenity.name}>
                    {/* Используем наш новый <Icon />, передавая ему имя из JSON */}
                    <Icon name={amenity.icon} />
                    <span>{amenity.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}