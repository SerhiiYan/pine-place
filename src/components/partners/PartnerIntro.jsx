// src/components/partners/PartnerIntro.jsx
import React, { useState } from 'react';
import HowItWorksModal from '@/components/common/HowItWorksModal.jsx';

export default function PartnerIntro() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <style>{`
        .intro-side h1 { font-size: 2.8rem; font-family: 'Georgia', serif; font-weight: 400; margin-bottom: 1.5rem; }
        .intro-side p { font-size: 1.1rem; line-height: 1.8; color: #6c757d; margin-bottom: 1.5rem; }
        .how-it-works-btn { background: none; border: none; color: #2C3E3A; font-weight: 600; text-decoration: underline; cursor: pointer; padding: 0; }
      `}</style>
      <div className="intro-side">
        <h1>Присоединяйтесь к Pine&Place</h1>
        <p>Мы не просто доска объявлений. Мы отбираем лучшие уединенные места Беларуси, чтобы познакомить их с аудиторией, которая ценит тишину и уют.</p>
        <p>Мы не берем комиссию с бронирований и связываем вас с гостями напрямую.</p>
        <button onClick={() => setIsModalOpen(true)} className="how-it-works-btn">
          Как происходит отбор?
        </button>
      </div>
      <HowItWorksModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}