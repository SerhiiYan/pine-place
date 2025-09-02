// src/components/ListingCard.jsx
import React, { useState } from 'react';
import FavoriteButton from './FavoriteButton.jsx';
import Icon from '@/components/common/Icon.jsx';
import Badges from './Badges.jsx';

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

  const displayBadges = [...(listing.badges || [])];
  // Проверяем, является ли размещение премиальным
  if (listing.listingTier === 'premium') {
    // Если да, ДОБАВЛЯЕМ В НАЧАЛО массива наш монетизационный бейдж
    displayBadges.unshift({ 
      type: 'premium', 
      label: 'Особое место', 
      icon: 'md:verified' 
    });
  }

  return (
    <a href={detailUrl} className="card-link">
      <div className="card">
        <div className="card-image-wrapper">
          <img src={listing.mainImage} alt={`Фото ${listing.name}`} className="card-image" />
          <div className="card-top-bar">
            <Badges badges={displayBadges} />
            <FavoriteButton slug={listing.slug} />
          </div>
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
        
        .card {
          border-radius: 12px;
          overflow: hidden;
          background: #fff;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          height: 100%;
          transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
          display: flex;
          flex-direction: column;

          /* --- ИЗМЕНЕНИЯ ЗДЕСЬ --- */
          /* 1. Создаем контекст наложения для карточки */
          position: relative; 
          /* 2. Помещаем ее на низкий слой по умолчанию */
          z-index: 1;
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.12);
          /* 3. При наведении делаем слой выше, чтобы тень была поверх соседей */
          z-index: 10;
        }

        .card-image-wrapper { position: relative; width: 100%; }
        .card-image { width: 100%; height: 220px; object-fit: cover; display: block; }
        
        .card-content { padding: 1rem 1.25rem; flex-grow: 1; display: flex; flex-direction: column; }
        
        .card-title {
          margin: 0 0 0.25rem 0;
          font-size: 1.25rem;
          line-height: 1.3;
          min-height: 2.6em; 
        }
        .card-top-bar {
          position: absolute;
          top: 0.8rem;
          left: 0.8rem;
          right: 0.8rem;

          display: flex;
          justify-content: space-between; 
          align-items: flex-start;      
          gap: 0.5rem;                  
        }  
        
        .card-location { color: #6c757d; font-size: 0.9rem; margin-bottom: 0.75rem; }

        .card-price {
          font-size: 0.9rem;
          color: #333;
          margin-top: auto;
        }
        .card-price span { font-weight: 700; font-size: 1.1rem; }
        
        .card-footer { display: flex; justify-content: space-between; font-size: 0.9rem; color: #333; border-top: 1px solid #eee; padding-top: 0.75rem; margin-top: 0.75rem; }
      `}</style>
    </a>
  );
}