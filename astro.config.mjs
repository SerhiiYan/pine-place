// astro.config.mjs

import { defineConfig } from 'astro/config';
import react from "@astrojs/react"; 
import icon from "astro-icon"; // Импортируем интеграцию

export default defineConfig({
  integrations: [
    react(),
    
    // Добавляем интеграцию с полной и правильной конфигурацией
    icon({
      // Указываем, какие наборы иконок мы разрешаем использовать
      // 'mdi' - это название набора, ['*'] - означает "все иконки из этого набора"
      include: {
        mdi: ['*'] 
      },
    })
  ] 
});