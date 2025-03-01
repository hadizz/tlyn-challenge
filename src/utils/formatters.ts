import { Decimal } from 'decimal.js';
import translator from './i18n';

export const formatRial = (amount: number | string | Decimal): string => {
  return (
    new Decimal(amount).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
    ` ${translator.rial}`
  );
};

export const formatGram = (weight: number | string | Decimal): string => {
  return `${new Decimal(weight).toFixed(3)} ${translator.gram}`;
};
