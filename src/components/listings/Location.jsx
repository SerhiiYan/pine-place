import React, { useState } from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import Icon from '@/components/common/Icon.jsx';

// Принимаем apiKey из пропсов, как и раньше
export default function Location({ listing, apiKey }) {
  // 1. ОСТАВЛЯЕМ ТОЛЬКО ОДНО СОСТОЯНИЕ
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Проверка на наличие ключа и координат остается
  if (!apiKey || !listing.coordinates?.latitude || !listing.coordinates?.longitude) {
    return null; 
  }
  
  const center = [listing.coordinates.latitude, listing.coordinates.longitude];

  // 2. УБИРАЕМ useEffect и состояние shouldLoadMap. Они больше не нужны.

  const openModal = () => setIsModalOpen(true);
  
  // Функция закрытия теперь тоже максимально простая
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* Секция с кнопкой остается без изменений */}
      <section className="location-section">
        <h2>Где вы остановитесь</h2>
        <div className="location-info">
          <span>{listing.location}</span>
        </div>
        
        {listing.mapImage ? (
          <div className="map-preview" onClick={openModal}>
            <img src={listing.mapImage} alt={`Карта расположения ${listing.name}`} />
            <button className="enlarge-map-btn">
              <Icon name="md:fullscreen" />
              <span>Увеличить карту</span>
            </button>
          </div>
        ) : (
          <div className="location-actions">
            <button onClick={openModal} className="show-all-btn">
              Показать на карте
            </button>
          </div>
        )}
      </section>

      {/* 3. ЛОГИКА РЕНДЕРИНГА МОДАЛЬНОГО ОКНА СТАНОВИТСЯ ПРОЩЕ */}
      {isModalOpen && (
        <div className="map-modal-backdrop" onClick={closeModal}>
          <div className="map-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>
              &times;
            </button>
            
            {/* 
              Компонент YMaps теперь монтируется ТОЛЬКО ТОГДА, когда открыто модальное окно.
              Он сам загрузит API и только после этого позволит отрендериться дочернему <Map>.
              Это самый чистый и надежный способ.
            */}
            <YMaps query={{ apikey: apiKey }}>
              <Map
                defaultState={{ center: center, zoom: 14, controls: ['zoomControl', 'fullscreenControl'] }}
                width="100%"
                height="100%"
                modules={["control.ZoomControl", "control.FullscreenControl"]}
              >
                <Placemark 
                  geometry={center} 
                  properties={{ hintContent: listing.name }}
                  options={{
                    // Говорим карте, что мы хотим использовать свою картинку
                    iconLayout: 'default#image',
                    // Указываем путь к нашей новой иконке в папке public
                    iconImageHref: '/images/map-pin/map-pin.svg',
                    // Задаем реальные размеры нашей иконки
                    iconImageSize: [40, 52],
                    // Смещаем иконку так, чтобы ее острый кончик указывал на координаты
                    // Смещение по X: минус половина ширины. Смещение по Y: минус вся высота.
                    iconImageOffset: [-20, -52],
                  }}
                />
              </Map>
            </YMaps>
          </div>
        </div>
      )}
    </>
  );
}