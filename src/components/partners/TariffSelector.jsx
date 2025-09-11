// src/components/partners/TariffSelector.jsx
import React, { useState } from 'react';
import { MdCheckCircleOutline } from 'react-icons/md';
import TARIFF_DATA from '@/data/tariffs.json';

function TariffCard({ tariff, activePlan }) { // <-- 1. Меняем проп
  const isPaid = tariff.name !== 'Free';
  let pricePerMonth = 0;
  let billingInfoText = tariff.slogan;

  if (isPaid) {
    // 2. Безопасно получаем детали плана по активному ключу
    const planDetails = tariff.plans[activePlan];
    
    pricePerMonth = planDetails.pricePerMonth;
    
    // 3. Формируем текст в зависимости от срока
    let termText = `${activePlan} месяца`;
    if (activePlan === '12') termText = 'год';

    billingInfoText = `Оплата раз в ${termText} — ${planDetails.price} BYN`;
  }

  return (
    <div className="tariff-card">
      <svg className="card-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 125 154" aria-hidden="true">
        <path fill="#2C3E3A" d="M50.49.14C40.3.87 32.65 4.14 25.6 8.29c-2.97 1.75-6.78 4.84-9.16 7.31l-3.94 4.09C-1.2 33.91 2.05 56.94 9.29 77.14c9.45 26.4 32.42 51.28 48.38 74.84 1.58 2.33 2.78 3.05 4.75.24 4.6-6.6 9.03-12.54 13.76-19.14C94.81 107.06 121.17 75.27 113 41.57c-6.08-25.07-30.31-43.25-56.98-41.35Z"/>
        <path fill="#fff" transform="translate(4 0)" d="m52.52 52.6-11.62-11.47c-2.99-3.16-5.53-.2-1.59 3.42l4.44 4.33c2.02 2 1.8 1.41 4.39 4.38 1.04 1.19 2.92 3.47 4.29 4.34l.05 16.07c-1.68-.95-5.78-5.75-8.43-8.26-4.59-4.33-6.52-7.86-9.57-6.21-.29 2.18.04 2.56 1.19 3.61l15.43 14.92c1.92 2.35 1.38 2.97 1.39 7.47l.05 10.37c-2.05-1.04-2.85-3.13-5.05-5.09-2.81-2.5-6.7-7.35-10.09-10.37-1.88-1.68-2.73-4.8-5.84-3-.38 2.38.81 2.56 2.02 3.87 1.04 1.12 1.86 2.35 2.89 3.35l11.86 12.63c4.1 4.61 4.18.4 4.16 12.01-.01 1.69-.47 6.02.64 7 3.69 3.22 3.01-5.18 3.01-8.09l0-5.85c0-2.43.73-2.25 2.19-3.58 1.15-1.05 1.69-1.97 2.78-3.06l11.81-11.58c2.52-2.45 5.24-4.82 4.34-7-2.46-1-4.31 1.99-5.66 3.48-2.1 2.31-13.35 13.38-15.49 14.83l.04-12.83c0-5.56.76-3.76 7.83-10.73l7.18-7.08c.88-.86 1.33-1.6 2.26-2.5 2.24-2.18.39-4.99-2.9-2.17-2.86 2.45-11.92 12.49-14.43 14.26l.06-10.06c-.02-5.19-.88-5 1.89-7.9l9.8-9.95c3.35-3.16 4.39-3.85 3.67-6.01-3.26-1.1-6.26 4.3-9.55 7.07-2.82 2.38-4.21 4.56-5.85 5.25l-.03-27.96c.01-1.56.62-4.1-1.27-4.61-3.23-.87-2.31 4.56-2.34 9-.06 7.83.26 15.94.06 23.7Z"/>
      </svg>
      <div className="card-header">
        <h3>{tariff.name}</h3>
        {tariff.name === 'Premium' && <span className="recommended-badge">Рекомендуем</span>}
      </div>
      <div className="card-body">
        <p className="price">
          {isPaid ? (
            <>
              <span className="price-amount">{pricePerMonth} BYN</span>
              <span className="price-period">/ месяц</span>
            </>
          ) : (
            <span className="price-amount">0 BYN</span>
          )}
        </p>
        <p className="billing-info">{billingInfoText}</p>
        <ul className="features-list">
          {tariff.features.map(feature => (
            <li key={feature} className="feature-item">
              <MdCheckCircleOutline className="feature-icon" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="cta-button-wrapper">
        <a href="/register" className="cta-button">
          {isPaid ? `Выбрать ${tariff.name}` : 'Начать бесплатно'}
        </a>
      </div>
    </div>
  );
}

export default function TariffSelector() {
  const [activePlan, setActivePlan] = useState('12');

  return (
    <>
      <style>{`
        .tariff-widget { text-align: center; }
        .tariff-widget-container {
          background-color: #fcfcfc; /* Очень легкий фон, почти белый */
          border-radius: 16px; /* Больше, чем у карточек внутри */
          padding: 2.5rem; /* Внутренние отступы */
          border: 1px solid #f0f0f0;
          /* Можно добавить легкую тень для эффекта "приподнятости" */
          box-shadow: 0 10px 40px rgba(44, 62, 58, 0.08);
        }
        .billing-toggle { display: inline-flex; background: #f0f0f0; border-radius: 99px; padding: 6px; margin-bottom: 2.5rem; }
        .toggle-btn { padding: 0.75rem 1.5rem; border: none; background: transparent; border-radius: 99px; font-weight: 600; cursor: pointer; transition: all 0.25s ease-out; color: #6c757d; }
        .toggle-btn.active { background: #fff; color: #2C3E3A; box-shadow: 0 3px 10px rgba(0,0,0,0.1); }
        .discount-badge { background-color: #e3d1a7; color: #38301e; font-size: 0.8rem; padding: 2px 6px; border-radius: 4px; margin-left: 0.5rem; }
        
        .tariffs-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2.5rem; align-items: stretch; margin-top: 25px; }
        
        .tariff-card {
            position: relative;
            background: #fff; border-radius: 12px; padding: 2.5rem 2rem 2rem 2rem;
            border: 1px solid #f0f0f0; text-align: left;
            display: flex; flex-direction: column;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .tariff-card:hover { transform: translateY(-8px); box-shadow: 0 15px 40px rgba(44, 62, 58, 0.12); }
        
        .card-logo {
            position: absolute;
            top: -25px; /* (50px / 2) */
            left: 50%;
            transform: translateX(-50%);
            width: 40px;
            height: auto;
            z-index: 5;
        }
        
        .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; min-height: 28px; }
        .card-header h3 { font-size: 1.5rem; margin: 0; }
        .recommended-badge { background: #2C3E3A; color: #fff; font-size: 0.8rem; padding: 4px 8px; border-radius: 6px; }
        
        .card-body { display: flex; flex-direction: column; flex-grow: 1; }
        .price { margin-bottom: 0.25rem; }
        .price-amount { font-size: 2.5rem; font-weight: 700; }
        .price-period { color: #6c757d; }
        .billing-info { font-size: 0.9rem; color: #7d6c6cff; margin: 0 0 1.5rem 0; min-height: 2.7em; }
        .features-list { list-style: none; padding: 1.5rem 0 0 0; margin: 0; border-top: 1px solid #f0f0f0; flex-grow: 1; display: flex; flex-direction: column; gap: 1rem; }
        .feature-item { display: flex; align-items: flex-start; gap: 0.75rem; font-size: 0.9rem; }
        .feature-icon { color: #2C3E3A; font-size: 1.2rem; margin-top: 2px; flex-shrink: 0; }
        
        .cta-button-wrapper { margin-top: auto; padding-top: 1.5rem; text-align: center; }
        .cta-button {
            display: flex; /* <-- Changed */
            justify-content: center;
            width: auto; /* <-- Changed */
            padding: 1rem 2rem; /* <-- Changed */
            border: 1px solid #e0e0e0;
            background-color: #fff;
            color: #2C3E3A;
            border-radius: 8px; font-size: 1.1rem;
            font-weight: 700; cursor: pointer; text-decoration: none;
            transition: all 0.2s ease;
        }
        .cta-button:hover { background-color: #2C3E3A; color: #fff; border-color: #2C3E3A; }

        @media(max-width: 900px) {
          .tariffs-grid { grid-template-columns: 1fr; }
          .tariff-widget-container {
            padding: 1.5rem; /* Уменьшаем отступы на мобильных */
          }
        }
      `}</style>
      <div className="tariff-widget-container"> 
        <div className="tariff-widget">
          <div className="billing-toggle">
            <button className={`toggle-btn ${activePlan === '3' ? 'active' : ''}`} onClick={() => setActivePlan('3')}>3 месяца</button>
            <button className={`toggle-btn ${activePlan === '6' ? 'active' : ''}`} onClick={() => setActivePlan('6')}>6 месяцев</button>
            <button className={`toggle-btn ${activePlan === '12' ? 'active' : ''}`} onClick={() => setActivePlan('12')}>
              1 год <span className="discount-badge">Выгодно</span>
            </button>
          </div>
        <div className="tariffs-grid">
          <TariffCard tariff={TARIFF_DATA.free} activePlan={activePlan} />
          <TariffCard tariff={TARIFF_DATA.basic} activePlan={activePlan} />
          <TariffCard tariff={TARIFF_DATA.premium} activePlan={activePlan} />
        </div>
        </div>
      </div>
    </>
  );
}