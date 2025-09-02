import React, { useState, useEffect } from 'react';

// Импорты Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Zoom, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/zoom';

export default function ImageGallery({ images }) {
  if (!images || images.length === 0) {
    return null;
  }

  // --- ЛОГИКА КОМПОНЕНТА ---
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth <= 768);
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const [lightbox, setLightbox] = useState({ isOpen: false, index: 0 });
  const openLightbox = (index) => setLightbox({ isOpen: true, index });
  const closeLightbox = () => setLightbox({ isOpen: false, index: 0 });

  // --- ГЛАВНОЕ ИСПРАВЛЕНИЕ ЗДЕСЬ ---
  // Мы теперь работаем с массивом объектов, поэтому нужно извлекать свойство .src
  const slides = images.map(imageObj => ({ src: imageObj.src }));
  const totalImages = images.length;
  
  const mainImage = images[0]?.src;
  const sideImages = images.slice(1, 4).map(img => img.src); 
  const lastVisibleImage = images[4]?.src; 
  const remainingCount = totalImages > 5 ? totalImages - 5 : 0;

  // --- РЕНДЕРИНГ КОМПОНЕНТА ---
  return (
    <>
      {isMobile ? (
        // === ВЕРСТКА ДЛЯ МОБИЛЬНЫХ УСТРОЙСТВ ===
        <div className="mobile-swiper-container">
          <Swiper
            modules={[Autoplay, Zoom]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            zoom={true}
            loop={true}
          >
            {/* Мы передаем в Swiper новый массив slides */}
            {slides.map((slide, index) => (
              <SwiperSlide key={index} onClick={() => openLightbox(index)}>
                <div className="swiper-zoom-container">
                  <img src={slide.src} alt={`Фото объекта ${index + 1}`} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        // === ВЕРСТКА ДЛЯ ДЕСКТОПНЫХ УСТРОЙСТВ ===
        <div className="gallery-collage">
          <div className="main-image" onClick={() => openLightbox(0)}>
            {mainImage && <img src={mainImage} alt="Главное фото объекта" />}
          </div>
          {sideImages.map((imageSrc, index) => (
            <div key={index} className={`side-image-${index + 1}`} onClick={() => openLightbox(index + 1)}>
              <img src={imageSrc} alt={`Фото объекта ${index + 2}`} />
            </div>
          ))}
          {lastVisibleImage && (
            <div className="side-image-4 last-image-container" onClick={() => openLightbox(4)}>
              <img src={lastVisibleImage} alt={`Фото объекта 5`} />
              {remainingCount > 0 && <div className="overlay">+{remainingCount} фото</div>}
            </div>
          )}
        </div>
      )}

      {/* ЛАЙТБОКС (общий для всех устройств) */}
      {lightbox.isOpen && (
        <div className="swiper-lightbox">
          <button className="close-btn" onClick={closeLightbox}>&times;</button>
          <Swiper
            modules={[Navigation, Pagination, Zoom]}
            initialSlide={lightbox.index}
            navigation
            pagination={{ clickable: true }}
            zoom={true}
            keyboard={true}
            loop={true}
            centeredSlides={true}
            className="mySwiper"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="swiper-zoom-container">
                  <img src={slide.src} alt={`Фото объекта ${index + 1}`} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
      
      <style>{`
        /* --- ДЕСКТОПНЫЕ СТИЛИ (для коллажа) --- */
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

        /* --- МОБИЛЬНЫЕ СТИЛИ (для Swiper) --- */
        .mobile-swiper-container {
          width: 100%;
          height: 500px;
          border-radius: 16px;
          overflow: hidden;
          position: relative;
        }
        .mobile-swiper-container .swiper-slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        /* 3. Удаляем стили для стрелок, они нам больше не нужны */

        /* --- СТИЛИ ДЛЯ SWIPER-ЛАЙТБОКСА (общие для всех устройств) --- */
        .swiper-lightbox {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.85); z-index: 9999; display: flex; align-items: center; justify-content: center;
        }
        .swiper-lightbox .mySwiper {
          width: 100%; height: 100%;
        }
        .swiper-lightbox .swiper-slide {
          display: flex; align-items: center; justify-content: center;
        }
        .swiper-lightbox .swiper-zoom-container img {
          max-width: 90vw; max-height: 85vh; object-fit: contain;
        }
        .swiper-lightbox .close-btn {
          position: absolute; top: 20px; right: 30px; font-size: 3rem; color: white; background: transparent; border: none; cursor: pointer; z-index: 10000;
        }
        .swiper-lightbox .swiper-button-next,
        .swiper-lightbox .swiper-button-prev {
          color: white; opacity: 0.7; transition: opacity 0.2s;
        }
        .swiper-button-next {
          margin-right: 30px;
        }
        .swiper-button-prev {
          margin-left: 30px;
        }
        .swiper-lightbox .swiper-button-next:hover,
        .swiper-lightbox .swiper-button-prev:hover {
          opacity: 1;
        }
        .swiper-lightbox .swiper-pagination-bullet-active {
          background: white;
        }

        /* Адаптация лайтбокса для мобильных */
        @media (max-width: 768px) {
          .swiper-lightbox .swiper-button-next,
          .swiper-lightbox .swiper-button-prev {
            display: none;
          }
          .swiper-lightbox .swiper-zoom-container img {
            max-width: 100vw;
            max-height: 90vh;
          }
        }
      `}</style>
    </>
  );
}