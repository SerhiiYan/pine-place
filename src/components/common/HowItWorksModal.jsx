// src/components/common/HowItWorksModal.jsx
import React from 'react';
import { MdClose } from 'react-icons/md';

export default function HowItWorksModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const steps = [
    { title: 'Заявка', description: 'Вы заполняете простую форму, рассказывая о вашем месте.' },
    { title: 'Отбор', description: 'Наш куратор знакомится с заявкой, чтобы убедиться, что все заполнено верно.' },
    { title: 'Создание страницы', description: 'Мы помогаем вам с текстом и советами по фото для создания идеальной страницы.' },
    { title: 'Гости', description: 'Вы начинаете получать прямые запросы от вашей целевой аудитории.' }
  ];

  return (
    <>
      <style>{`
        .modal-backdrop {
            position: fixed; inset: 0; background: rgba(0,0,0,0.6); display: flex;
            align-items: center; justify-content: center; z-index: 1000; padding: 1rem;
        }
        .modal-content {
            background: #fff; border-radius: 12px; padding: 2.5rem 3rem;
            width: 100%; max-width: 600px; position: relative;
            /* Убедимся, что по умолчанию у контента нет лишних отступов */
            margin: 0; 
        }
        .modal-close-btn {
            position: absolute; top: 1rem; right: 1rem; background: none; border: none;
            font-size: 1.5rem; cursor: pointer; color: #999;
        }
        .modal-title {
            margin: 0 0 2.5rem 0; font-size: 1.6rem;
            text-align: center; font-family: 'Georgia', serif; font-weight: 400;
        }
        .steps-container {
            position: relative; display: flex; flex-direction: column; gap: 2rem;
        }
        .steps-container::before {
            content: ''; position: absolute; top: 18px; bottom: 18px; left: 15px;
            width: 2px; background-color: #f0f0f0; z-index: 1;
        }
        .step-item {
            display: flex; align-items: flex-start; gap: 1.5rem; position: relative; z-index: 2;
        }
        .step-number {
            background: #2C3E3A; color: #fff; border-radius: 50%;
            width: 32px; height: 32px; display: flex; align-items: center;
            justify-content: center; font-weight: 700; flex-shrink: 0;
            border: 3px solid #fff;
        }
        .step-title {
            font-weight: 700; font-size: 1.1rem; margin-bottom: 0.3rem;
        }
        .step-description {
            color: #6c757d; line-height: 1.6;
        }

        /* --- ✨ ВОТ РЕШЕНИЕ ПРОБЛЕМЫ ДЛЯ МОБИЛЬНЫХ ✨ --- */
        @media (max-width: 768px) {
          .modal-backdrop {
            /* 1. Выравниваем по верху, а не по центру */
            align-items: flex-start;
            /* 2. Включаем вертикальную прокрутку для всего фона */
            overflow-y: auto;
          }
          .modal-content {
            /* 3. Добавляем отступы сверху и снизу, чтобы окно не прилипало */
            /*    к краям экрана при прокрутке */
            margin: 2rem 0;
            padding: 2rem 1.5rem; /* Немного уменьшим боковые отступы */
          }
        }
      `}</style>
      <div className="modal-backdrop" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button onClick={onClose} className="modal-close-btn"><MdClose /></button>
          <h2 className="modal-title">Процесс размещения</h2>
          <div className="steps-container">
            {steps.map((step, index) => (
              <div key={index} className="step-item">
                <div className="step-number">{index + 1}</div>
                <div>
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}