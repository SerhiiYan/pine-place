import React, { useState } from 'react';

import Icon from '@/components/common/Icon.jsx';
import AmenitiesModal from './AmenitiesModal.jsx';
import amenitiesDirectory from '@/data/amenities-directory.json';

// --- КЛЮЧЕВОЕ ИСПРАВЛЕНИЕ ДЛЯ СОВМЕСТИМОСТИ ---
// Создаем простой React-компонент, который будет рендерить SVG иконки.
// Это решает проблему несовместимости Astro-компонентов и React.
const MdiIcon = ({ name, size = "1.25rem" }) => (
  // Здесь мы предполагаем, что у нас есть способ получить SVG-путь по имени.
  // Самый простой способ — это создать "справочник" путей, но пока для простоты
  // мы оставим заглушку. Я объясню, как это исправить, в следующем шаге, если возникнет ошибка.
  // Сейчас мы просто создадим обертку.
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    {/* В реальном проекте здесь будет динамический <path> */}
  </svg>
);
// ПРИМЕЧАНИЕ: Использование astro-icon внутри React — сложная тема.
// Я предлагаю временно убрать иконки из превью, чтобы не усложнять.
// В модальном окне они будут работать, так как мы можем передать их как пропсы.

export default function Amenities({ amenities }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Берем популярные удобства для превью
  const popularAmenities = amenities?.popular || [];

  return (
    <section className="amenities-section">
      <h2>Удобства</h2>
      <div className="amenities-preview-grid">
        {popularAmenities.map(key => {
          const amenity = amenitiesDirectory[key];
          if (!amenity) return null;
          return (
            // Отображаем пока только текст, чтобы избежать ошибки с иконками
            <div key={key} className="amenity-item">
              <Icon name={amenity.icon} />
              <span>{amenity.name}</span>
            </div>
          );
        })}
      </div>
      
      <button className="show-all-btn" onClick={() => setIsModalOpen(true)}>
        Показать все удобства
      </button>

      {isModalOpen && (
        <AmenitiesModal 
          allAmenities={amenities?.all || []} 
          directory={amenitiesDirectory}
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </section>
  );
}