import { atom } from 'nanostores';

// Создаем "атом" - кусочек состояния
export const filters = atom({
  region: 'Все',
  guests: 0,
  type: 'Все',
});