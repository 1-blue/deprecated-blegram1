/** 2023/06/03 - 배열 섞기 - by 1-blue */
export const shuffle = (array: any[]) => {
  const copyArray = [...array];

  for (let index = copyArray.length - 1; index > 0; index--) {
    const randomPosition = Math.floor(Math.random() * (index + 1));

    const temporary = copyArray[index];
    copyArray[index] = copyArray[randomPosition];
    copyArray[randomPosition] = temporary;
  }

  return copyArray;
};
