const goldMinPrice = 33000000;
const goldMaxPrice = 36000000;

export const getSystemGoldPrice = () =>
  Math.floor(Math.random() * (goldMaxPrice - goldMinPrice) + goldMinPrice);
