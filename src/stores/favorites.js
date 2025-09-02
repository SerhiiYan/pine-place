// src/stores/favorites.js

import { persistentAtom } from '@nanostores/persistent';

// Создаем "атом", который будет хранить массив slug'ов.
export const favoriteSlugs = persistentAtom(
  'favoriteSlugs', // Ключ, под которым данные будут храниться в localStorage
  [],              // Начальное значение, если в localStorage ничего нет (обязательно массив)
  {                // <--- ВОТ РЕШЕНИЕ
    encode: JSON.stringify, // Функция для превращения массива в строку перед сохранением
    decode: JSON.parse      // Функция для превращения строки из localStorage обратно в массив
  }
);

// Теперь остальная часть кода будет работать без изменений,
// так как favoriteSlugs.get() ГАРАНТИРОВАННО вернет массив.
export const toggleFavorite = (slug) => {
  const currentFavorites = favoriteSlugs.get(); // Теперь это всегда массив
  const isFavorited = currentFavorites.includes(slug);

  if (isFavorited) {
    // Если уже в избранном — удаляем
    favoriteSlugs.set(currentFavorites.filter(s => s !== slug));
  } else {
    // Если нет — добавляем
    favoriteSlugs.set([...currentFavorites, slug]);
  }
};