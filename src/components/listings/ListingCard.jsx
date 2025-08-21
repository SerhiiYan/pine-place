// src/components/ListingCard.jsx
import React, { useState } from 'react';
import FavoriteButton from './FavoriteButton.jsx';
// Вспомогательная функция, чтобы безопасно найти базовую цену
const getBasePrice = (listing) => {
  try {
    const priceSection = listing.conditions.sections.find(
      (section) => section.title === "Основные цены"
    );
    const priceItem = priceSection.items[0].value; 
    return priceItem.match(/\d+/)[0]; 
  } catch (error) {
    return null; // Если цен нет, ничего не возвращаем
  }
};

export default function ListingCard({ listing }) {
  const detailUrl = `/houses/${listing.slug}`;
  const basePrice = getBasePrice(listing);

  return (
    <a href={detailUrl} className="card-link">
      <div className="card">
        <div className="card-image-wrapper">
          <img src={listing.mainImage} alt={`Фото ${listing.name}`} className="card-image" />
          <FavoriteButton />
        </div>
        
        <div className="card-content">
          <h3 className="card-title">{listing.name}</h3>
          <p className="card-location">{listing.location}</p>
          
          {/* НОВЫЙ БЛОК С ЦЕНОЙ */}
          {basePrice && (
            <p className="card-price">
              <span>{basePrice} BYN</span> / ночь
            </p>
          )}

          <div className="card-footer">
            <span>{listing.type}</span>
            <span>Гостей: {listing.sleeps}</span>
          </div>
        </div>
      </div>
      <style>{`
        .card-link { text-decoration: none; color: inherit; display: block; height: 100%; }
        .card { border-radius: 12px; overflow: hidden; background: #fff; box-shadow: 0 4px 12px rgba(0,0,0,0.08); height: 100%; transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out; display: flex; flex-direction: column; }
        .card:hover { transform: translateY(-5px); box-shadow: 0 8px 20px rgba(0,0,0,0.12); }
        .card-image-wrapper { position: relative; width: 100%; }
        .card-image { width: 100%; height: 220px; object-fit: cover; display: block; }
        .card-content { padding: 1rem 1.25rem; flex-grow: 1; display: flex; flex-direction: column; }
        
        /* --- КЛЮЧЕВОЕ ИСПРАВЛЕНИЕ ВЫРАВНИВАНИЯ --- */
        .card-title {
          margin: 0 0 0.25rem 0;
          font-size: 1.25rem;
          line-height: 1.3;
          /* Задаем минимальную высоту, равную примерно двум строкам текста */
          min-height: 2.6em; 
        }
        
        .card-location { color: #6c757d; font-size: 0.9rem; margin-bottom: 0.75rem; }

        .card-price {
          font-size: 0.9rem;
          color: #333;
          margin-top: auto; /* Прижимает цену (и все что ниже) к футеру */
        }
        .card-price span { font-weight: 700; font-size: 1.1rem; }
        
        .card-footer { display: flex; justify-content: space-between; font-size: 0.9rem; color: #333; border-top: 1px solid #eee; padding-top: 0.75rem; margin-top: 0.75rem; }
      `}</style>
    </a>
  );
}