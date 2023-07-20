export const getRandomColor = () => {
  // Генерируем случайные значения для красного, зеленого и синего цветовых компонентов
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  // Преобразуем значения компонентов в строку HEX
  return `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`;
};
