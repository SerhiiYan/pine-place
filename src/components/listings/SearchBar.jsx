import React from 'react';
import { useStore } from '@nanostores/react';
import { filters } from '@/stores/filters.js'; // Импортируем наше хранилище

export default function SearchBar({ regions, types }) {
  // Читаем текущее состояние из хранилища
  const $filters = useStore(filters);

  // Функция для обновления хранилища
  const updateFilter = (key, value) => {
    filters.set({ ...$filters, [key]: value });
  };
  
  const guestOptions = [
    { value: 0, label: "Любое кол-во" },
    { value: 2, label: "2+ гостя" },
    { value: 4, label: "4+ гостя" },
    { value: 6, label: "6+ гостей" },
    { value: 8, label: "8+ гостей" },
  ];

  return (
    <div className="search-bar">
      <div className="filter-group">
        <label>Куда?</label>
        <select onChange={e => updateFilter('region', e.target.value)} value={$filters.region}>
          {regions.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>
      <div className="filter-group">
        <label>Сколько гостей?</label>
        <select onChange={e => updateFilter('guests', Number(e.target.value))} value={$filters.guests}>
          {guestOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>
      <div className="filter-group">
        <label>Что ищем?</label>
        <select onChange={e => updateFilter('type', e.target.value)} value={$filters.type}>
          {types.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
    </div>
  );
}