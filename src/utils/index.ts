/* eslint-disable no-useless-escape */
const slugify = (text: string): string =>
  text
    .toString()
    .toLowerCase()
    .replace(/[\s_]+/g, '-') // boşluk ve alt çizgileri tire ile değiştirir
    .replace(/[^\w\-]+/g, '') // alfanumerik olmayan karakterleri kaldırır
    .replace(/\-\-+/g, '-') // ardışık tireleri tek tire yapar
    .replace(/^-+/, '') // baştaki tüm tırnak işaretlerini kaldırır
    .replace(/-+$/, ''); // sondaki tüm tırnak işaretlerini kaldırır

const deslugify = (slug: string): string => {
  let text = slug.replace(/-/g, ' ');
  text = text.replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());

  return text;
};

export { deslugify, slugify };
