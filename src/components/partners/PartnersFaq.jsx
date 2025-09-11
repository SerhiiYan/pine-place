// src/components/partners/PartnersFaq.jsx
import React, { useState } from 'react';
import { MdAdd, MdRemove } from 'react-icons/md';

// Данные для FAQ храним прямо здесь для удобства
const FAQ_DATA = [
  {
    question: "Как формируются позиции объектов в каталоге?",
    answer: "Мы стремимся к максимальной прозрачности. По умолчанию, первыми в каталоге всегда отображаются домики с тарифом Premium, затем — с тарифом Basic, и после них — Free. Это гарантирует, что наши платные партнеры всегда получают максимум внимания. Внутри каждой тарифной группы мы используем специальный алгоритм для справедливого перемешивания, чтобы у всех были равные шансы."
  },
  {
    question: "В чем ключевые отличия платных и бесплатных тарифов?",
    answer: "Главное отличие — это видимость. Платные тарифы (Basic и Premium) всегда отображаются выше бесплатных, что напрямую влияет на количество просмотров. Кроме того, для тарифа Free установлено ограничение в 10 фотографий, в то время как на платных тарифах их количество не ограничено."
  },
  {
    question: "Будет ли возможность онлайн-бронирования через каталог?",
    answer: "Да, мы активно работаем над внедрением удобной и безопасной системы онлайн-бронирования с управлением календарем. Это наш главный приоритет в разработке. Как только функция будет готова, мы обязательно сообщим всем нашим партнерам."
  },
  {
    question: "Как посетители могут связаться с владельцем объекта?",
    answer: "Мы верим в прямую и честную коммуникацию. На странице каждого домика есть виджет с вашими прямыми контактами: телефоном, ссылками на Instagram, Telegram и т.д. Все запросы и бронирования поступают напрямую к вам."
  },
  {
    question: "Почему мой объект есть в каталоге, если я его не добавлял?",
    answer: "Pine&Place — это в первую очередь кураторская коллекция. Если ваш домик оказался у нас, значит, он произвел на нас большое впечатление. Мы всегда используем только публично доступную информацию. Если вы хотите изменить описание, добавить фото или убрать объект из каталога, пожалуйста, просто свяжитесь с нами."
  },
];

// Отдельный компонент для одного элемента аккордеона
function FaqItem({ item, isOpen, onClick }) {
  return (
    <div className="faq-item">
      <button className="faq-question" onClick={onClick}>
        <span>{item.question}</span>
        <div className="faq-icon">
          {isOpen ? <MdRemove /> : <MdAdd />}
        </div>
      </button>
      <div className={`faq-answer ${isOpen ? 'open' : ''}`}>
        <p>{item.answer}</p>
      </div>
    </div>
  );
}


export default function PartnersFaq() {
  const [openIndex, setOpenIndex] = useState(null); // Храним индекс открытого элемента

  const handleClick = (index) => {
    // Если кликнули на уже открытый, закрываем его. Иначе — открываем новый.
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <style>{`
        .faq-section { width: 100%; max-width: 800px; margin: 0 auto; }
        .faq-item { border-bottom: 1px solid #e9ecef; }
        .faq-question {
          display: flex; justify-content: space-between; align-items: center;
          width: 100%; text-align: left; background: none; border: none;
          padding: 1.5rem 0; cursor: pointer;
        }
        .faq-question span { font-size: 1.1rem; font-weight: 600; }
        .faq-icon { font-size: 1.5rem; color: #2C3E3A; }

        .faq-answer {
          display: grid;
          grid-template-rows: 0fr; /* По умолчанию высота 0 */
          transition: grid-template-rows 0.3s ease-out;
        }
        .faq-answer.open {
          grid-template-rows: 1fr; /* При открытии — расширяем до полной высоты */
        }
        .faq-answer p {
          overflow: hidden;
          padding: 0 0 1.5rem 0;
          margin: 0;
          color: #6c757d;
          line-height: 1.7;
        }
      `}</style>
      <div className="faq-section">
        {FAQ_DATA.map((item, index) => (
          <FaqItem
            key={index}
            item={item}
            isOpen={openIndex === index}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
    </>
  );
}