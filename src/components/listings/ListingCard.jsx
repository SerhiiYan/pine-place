// src/components/ListingCard.jsx
import React, { useState } from 'react';

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

  // --- НОВОЕ: Состояние для отслеживания "избранного" ---
  const [isFavorited, setIsFavorited] = useState(false);

  // Обработчик клика по сердечку
  const handleFavoriteClick = (e) => {
    e.preventDefault(); // Отменяем переход по ссылке карточки
    setIsFavorited(!isFavorited); // Меняем состояние на противоположное
  };

  return (
    <a href={detailUrl} className="card-link">
      <div className="card">
        <div className="card-image-wrapper">
          <img src={listing.mainImage} alt={`Фото ${listing.name}`} className="card-image" />
          
          <button 
            className={`favorite-btn ${isFavorited ? 'is-favorited' : ''}`} 
            aria-label="Добавить в избранное" 
            onClick={handleFavoriteClick}
          >
            {/* Условный рендеринг SVG в зависимости от состояния */}
            {isFavorited ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            )}
          </button>
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
        
        .favorite-btn {
          position: absolute; top: 0.8rem; right: 0.8rem; background: rgba(0, 0, 0, 0.35); border-radius: 50%; border: none;
          color: white; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; cursor: pointer;
          transition: all 0.2s; padding: 0;
        }
        .favorite-btn:hover { background: #2c3e3a; transform: scale(1.2); }
        .favorite-btn.is-favorited {
          background: transparent;
          color: #E53935; /* Красный цвет для залитого сердечка */
        }
        .favorite-btn svg { width: 20px; height: 20px; }
        
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