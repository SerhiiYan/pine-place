// src/components/listings/FavoritesActions.jsx
import React, { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { favoriteSlugs } from '@/stores/favorites.js';
import { MdShare, MdDeleteOutline } from 'react-icons/md';
import ConfirmModal from '@/components/common/ConfirmModal.jsx';
import ShareModal from '@/components/common/ShareModal.jsx';

// 1. Принимаем 'allListings' как пропс
export default function FavoritesActions({ allListings }) { 
  const [isClient, setIsClient] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const $favoriteSlugs = useStore(favoriteSlugs);
  const hasFavorites = $favoriteSlugs.length > 0;

  useEffect(() => { setIsClient(true); }, []);
  
  // 2. Исправляем 'setIsModalOpen' на 'setIsConfirmModalOpen'
  const handleClear = () => {
    setIsConfirmModalOpen(true);
  };
  
  const confirmClear = () => {
    favoriteSlugs.set([]);
    setIsConfirmModalOpen(false); // И здесь тоже
  };

  // 3. Старая функция handleShare полностью удалена, она не нужна

  if (!isClient || !hasFavorites) {
    return null;
  }

  return (
    <>
      {/* Стили остаются те же */}
      <style>{`
        .actions-panel { display: flex; align-items: center; gap: 0.75rem; }
        .clear-button, .share-button { display: inline-flex; justify-content: center; align-items: center; gap: 0.5rem; background: none; border: none; cursor: pointer; font-weight: 600; border-radius: 8px; padding: 0.6rem 1rem; font-size: 0.9rem; transition: background-color 0.2s; }
        .clear-button { color: #E53935; }
        .clear-button:hover { background-color: rgba(229, 57, 53, 0.1); }
        .share-button { background-color: #f0f0f0; border: 1px solid #e0e0e0; color: #333; }
        .share-button:hover { background-color: #e5e5e5; }
        @media (max-width: 768px) {
          .page-header {
            flex-direction: column; /* 1. Ставим элементы друг под другом */
            align-items: flex-start; /* 2. Выравниваем все по левому краю */
            gap: 1rem; /* 3. Добавляем отступ между заголовком и кнопками */
          }
        }
      `}</style>
      
      <div className="actions-panel">
        <button onClick={() => setIsShareModalOpen(true)} className="share-button">
          <MdShare />
          Поделиться
        </button>
        <button onClick={handleClear} className="clear-button">
          <MdDeleteOutline />
          Очистить
        </button>
      </div>

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={confirmClear}
        title="Подтвердите действие"
      >
        Вы уверены, что хотите удалить все домики из избранного?
      </ConfirmModal>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        allListings={allListings}
      />
    </>
  );
}