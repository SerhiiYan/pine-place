import React, { useState } from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import Icon from '@/components/common/Icon.jsx';

export default function Location({ listing, apiKey }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!apiKey || !listing.coordinates?.latitude || !listing.coordinates?.longitude) {
    return null; 
  }
  
  const center = [listing.coordinates.latitude, listing.coordinates.longitude];

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
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
      {isModalOpen && (
        <div className="map-modal-backdrop" onClick={closeModal}>
          <div className="map-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>
              &times;
            </button>
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
                    iconLayout: 'default#image',
                    iconImageHref: '/images/map-pin/map-pin.svg',
                    iconImageSize: [40, 52],
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