import React, { useState } from 'react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

export default function ImageGallery({ images }) {
  if (!images || images.length === 0) return null;

  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const slides = images.map(src => ({ src }));
  const totalImages = images.length;
  
  // --- КЛЮЧЕВЫЕ ИЗМЕНЕНИЯ В ЛОГИКЕ ---
  const mainImage = images[0];
  // Теперь берем только 3 картинки для первых слотов
  const sideImages = images.slice(1, 4); 
  // Пятая картинка (если она есть) будет в "специальном" слоте
  const lastVisibleImage = images[4]; 
  // Считаем, сколько еще фото скрыто
  const remainingCount = totalImages > 5 ? totalImages - 5 : 0;

  return (
    <>
      <div className="gallery-collage">
        {/* Главное изображение */}
        <div className="main-image" onClick={() => openLightbox(0)}>
          <img src={mainImage} alt="Главное фото объекта" />
        </div>
        
        {/* Первые 3 боковых изображения */}
        {sideImages.map((image, index) => (
          <div 
            key={index}
            className={`side-image-${index + 1}`} 
            onClick={() => openLightbox(index + 1)}
          >
            <img src={image} alt={`Фото объекта ${index + 2}`} />
          </div>
        ))}

        {/* "Специальный" четвертый слот */}
        {lastVisibleImage && (
          <div className="side-image-4 last-image-container" onClick={() => openLightbox(4)}>
            <img src={lastVisibleImage} alt={`Фото объекта 5`} />
            {remainingCount > 0 && (
              <div className="overlay">
                +{remainingCount} фото
              </div>
            )}
          </div>
        )}
      </div>
      
      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        slides={slides}
        index={currentIndex}
        plugins={[Counter, Thumbnails]}
        // --- КЛЮЧЕВОЕ ИЗМЕНЕНИЕ: Добавляем кастомный класс ---
        className="custom-lightbox"
      />
 <style>{`
  .gallery-collage {
          display: grid;
          gap: 0.5rem;
          border-radius: 16px;
          overflow: hidden;
          height: 500px;
          grid-template-areas: "main side-1 side-2" "main side-3 side-4";
          grid-template-columns: 2fr 1fr 1fr;
        }
        .main-image { grid-area: main; cursor: pointer; }
        .side-image-1 { grid-area: side-1; cursor: pointer; }
        .side-image-2 { grid-area: side-2; cursor: pointer; }
        .side-image-3 { grid-area: side-3; cursor: pointer; }
        .side-image-4 { grid-area: side-4; cursor: pointer; }
        .gallery-collage > div { width: 100%; height: 100%; overflow: hidden; }
        .gallery-collage img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease; }
        .gallery-collage img:hover { transform: scale(1.05); }
        .last-image-container { position: relative; }
        .overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); color: white; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: bold; transition: background 0.2s; }
        .last-image-container:hover .overlay { background: rgba(0, 0, 0, 0.7); }

        /* --- МОБИЛЬНАЯ АДАПТАЦИЯ (max-width: 768px) --- */
        @media (max-width: 768px) {
          .gallery-collage {
            grid-template-areas: "main main" "main main";
            grid-template-columns: 1fr;
            height: 300px; /* Уменьшаем высоту для мобильных */
          }
          /* Прячем все боковые картинки */
          .side-image-1, .side-image-2, .side-image-3, .side-image-4 {
            display: none;
          }
        }
`}</style>
    </>
  );
}