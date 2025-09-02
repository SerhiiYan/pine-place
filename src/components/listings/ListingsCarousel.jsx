import React, { useEffect, useRef } from 'react';

// Swiper
import Swiper from 'swiper';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

// Импортируем нашу универсальную карточку!
import ListingCard from './ListingCard.jsx';

// В Swiper для React нужно импортировать эти компоненты
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle'; // Импортируем бандл стилей


export default function ListingsCarousel({ listings }) {
  if (!listings || listings.length === 0) {
    return null;
  }

  return (
    <div className="swiper-container-padded">
      {/* 
        Мы используем официальный React-компонент от Swiper.
        Он сам позаботится о правильной инициализации и уничтожении слайдера.
      */}
      <SwiperReact
        modules={[Autoplay]}
        loop={true}
        speed={20000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        spaceBetween={24}
        slidesPerView={1.2}
        freeMode={{
            enabled: true,
            sticky: false,
            momentumBounce: false,
        }}
        breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 24 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
        }}
        className="other-listings-swiper"
      >
        {/* Перебираем домики и для каждого создаем слайд с нашей карточкой */}
        {listings.map(listing => (
          <SwiperSlide key={listing.slug} style={{ height: 'auto' }}>
            <ListingCard listing={listing} />
          </SwiperSlide>
        ))}
        {/* CSS-правило для плавной анимации в Swiper 8+ */}
        <style>{`.swiper-wrapper { transition-timing-function: linear !important; }`}</style>
      </SwiperReact>
    </div>
  );
}

