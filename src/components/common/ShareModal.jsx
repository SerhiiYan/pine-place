// src/components/common/ShareModal.jsx
import React from 'react';
import { useStore } from '@nanostores/react';
import { favoriteSlugs } from '@/stores/favorites.js';

export default function ShareModal({ isOpen, onClose, allListings }) {
  const $favoriteSlugs = useStore(favoriteSlugs);
  
  const favoriteListings = allListings.filter(listing => 
    $favoriteSlugs.includes(listing.slug)
  );

  const handleShareListing = async (listing) => {
    const shareUrl = `${window.location.origin}/houses/${listing.slug}`;
    const shareText = `Посмотри, какое классное место я нашел на Pine&Place: ${listing.name}\n\n${shareUrl}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Pine&Place: ${listing.name}`,
          text: shareText,
          url: shareUrl,
        });
      } catch (error) {
        console.error("Ошибка при попытке поделиться:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert(`Ссылка на домик "${listing.name}" скопирована в буфер обмена!`);
      } catch (error) {
        console.error("Не удалось скопировать ссылку", error)
      }
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        .modal-backdrop {
          position: fixed; inset: 0; background: rgba(0,0,0,0.6);
          display: flex; align-items: center; justify-content: center; z-index: 1000;
          padding: 1rem; /* Отступы для мобильных */
        }
        .modal-content {
          background: #fff; border-radius: 12px; padding: 2rem;
          width: 100%; 
          max-width: 650px; /* Сделаем окно пошире для сетки */
          display: flex;
          flex-direction: column;
        }
        .modal-title {
          margin: 0 0 1.5rem 0; font-size: 1.5rem; text-align: center;
          flex-shrink: 0; /* Заголовок не должен сжиматься */
        }
        
        /* --- СТИЛИ ДЛЯ НОВОЙ СЕТКИ --- */
        .listings-grid-container {
          overflow-y: auto; /* Появится скролл, если контент не влезет */
          max-height: 60vh; /* Ограничиваем высоту (60% от высоты экрана) */
          padding-right: 0.5rem; /* Место для скроллбара */
        }
        .listings-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr); /* Две колонки */
          gap: 1rem;
        }
        
        /* --- СТИЛИ ДЛЯ НОВОЙ КАРТОЧКИ --- */
        .listing-card-button {
          position: relative;
          height: 150px; /* Фиксированная высота карточки */
          border-radius: 8px;
          overflow: hidden;
          border: none;
          padding: 0;
          cursor: pointer;
          display: block;
          text-align: left;
        }
        .card-bg-img {
          position: absolute; inset: 0; width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        .card-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 80%);
        }
        .card-title {
          position: absolute;
          bottom: 0.75rem;
          left: 0.75rem;
          right: 0.75rem;
          color: #fff;
          font-weight: 600;
          font-size: 1rem;
        }
        .listing-card-button:hover .card-bg-img {
          transform: scale(1.05);
        }

        /* Адаптация для мобильных */
        @media (max-width: 600px) {
          .listings-grid {
            grid-template-columns: 1fr; /* Одна колонка на мобильных */
          }
        }
      `}</style>
      <div className="modal-backdrop" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h2 className="modal-title">Выберите домик, которым хотите поделиться</h2>
          <div className="listings-grid-container">
            <div className="listings-grid">
              {favoriteListings.map(listing => (
                <button 
                  key={listing.slug} 
                  className="listing-card-button"
                  onClick={() => handleShareListing(listing)}
                >
                  {/* --- ИЗМЕНЕНИЕ ЗДЕСЬ --- */}
                  <img src={listing.mainImage} alt="" className="card-bg-img" />
                  
                  <div className="card-overlay"></div>
                  <h3 className="card-title">{listing.name}</h3>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}