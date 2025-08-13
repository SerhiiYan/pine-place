import React from 'react';

// --- ШАГ 1: ЯВНЫЙ ИМПОРТ ВСЕХ НУЖНЫХ НАМ ИКОНОК ---
// Это самый правильный и производительный способ.
import {
  MdWifi,
  MdLocalParking,
  MdFireplace,
  MdHotTub,
  MdPool,
  MdOutdoorGrill,
  MdKitchen,
  MdDeck,
  MdWaves,
  MdPets,
  MdTv,
  MdVideocam,
  MdPhishing,
  MdOutlineFireplace,
  MdSailing,
  MdTune,
  MdCheck,
  MdClose
} from 'react-icons/md';

// --- ШАГ 2: СОЗДАЕМ "КАРТУ" ДЛЯ СОПОСТАВЛЕНИЯ СТРОК И КОМПОНЕНТОВ ---
const ICON_MAP = {
  'md:wifi': MdWifi,
  'md:local-parking': MdLocalParking,
  'md:fireplace': MdFireplace,
  'md:MdOutlineFireplace': MdOutlineFireplace,
  'md:hot-tub': MdHotTub,
  'md:pool': MdPool,
  'md:outdoor-grill': MdOutdoorGrill,
  'md:kitchen': MdKitchen,
  'md:deck': MdDeck,
  'md:waves': MdWaves,
  'md:pets': MdPets,
  'md:tv': MdTv,
  'md:videocam': MdVideocam,
  'md:phishing': MdPhishing,
  'md:sailing': MdSailing,
  'md:tune': MdTune,
  'md:check': MdCheck,
  'md:close': MdClose
};

const Icon = ({ name, size = '1em', color = 'currentColor', ...props }) => {
  if (!name) return null;

  // --- ШАГ 3: ПРОСТОЙ И БЫСТРЫЙ ПОИСК В "КАРТЕ" ---
  const IconComponent = ICON_MAP[name];

  if (!IconComponent) {
    console.warn(`Иконка с именем "${name}" не найдена в ICON_MAP.`);
    return null;
  }

  return <IconComponent size={size} color={color} {...props} />;
};

export default Icon;