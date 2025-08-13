import { map } from 'nanostores';

// Наше состояние фильтров
export const filters = map({
  region: 'Все',
  guests: 0,
  type: 'Все',
  searchTerm: '', 
  activeAmenities: [], 
});

// --- НОВАЯ ЦЕНТРАЛЬНАЯ ФУНКЦИЯ ДЛЯ СБРОСА ---
// Она сбрасывает все фильтры, используемые на странице региона,
// до их первоначальных значений.
export const resetRegionFilters = () => {
  filters.setKey('guests', 0);
  filters.setKey('type', 'Все');
  filters.setKey('searchTerm', '');
  filters.setKey('activeAmenities', []);
};