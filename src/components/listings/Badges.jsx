// src/components/listings/Badges.jsx
import React from 'react';
import Icon from '@/components/common/Icon.jsx';

export default function Badges({ badges }) {
  // Если массива нет или он пустой, ничего не рендерим
  if (!badges || badges.length === 0) {
    return null;
  }

  return (
    <>
      <style>{`
        .badges-container {
          display: flex;
          gap: 0.5rem;
          z-index: 3; /* Чтобы были поверх картинки */
          flex-wrap: wrap;
          
        }
        .badge {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0.3rem 0.6rem;
          border-radius: 8px;
          font-size: 0.7rem;
          font-weight: 400;
          line-height: 1;
        }

        /* --- Стили для разных типов бейджей --- */

        /* "Особое место" (Премиум) */
        .badge.premium {
          background-color: #E3D1A7; /* Золотистый/песочный цвет */
          color: #38301E; /* Темный оттенок для контраста */
        }

        /* "Выбор Pine&Place" */
        .badge.recommended {
          background-color: #2C3E3A; /* Фирменный темный цвет */
          color: #fff;
        }

        /* "Новинка" */
        .badge.new {
          background-color: #4CAF50; /* Зеленый, привлекающий внимание */
          color: #fff;
        }
        
        /* Стили по умолчанию, если тип не опознан */
        .badge.default {
          background-color: #f8f9fa;
          color: #333;
          border: 1px solid #e0e0e0;
        }
      `}</style>

      <div className="badges-container">
        {badges.map((badge) => (
          // Добавляем 'default' как запасной класс
          <div key={badge.type} className={`badge ${badge.type || 'default'}`}>
            {badge.icon && <Icon name={badge.icon} size="2em" />}
            <span>{badge.label}</span>
          </div>
        ))}
      </div>
    </>
  );
}