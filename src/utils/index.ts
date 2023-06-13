import type { Task, TaskForm } from '@@types/types';

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

const generateID = (): string => {
  const characters = 'abcdef0123456789';
  let id = '';

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 36; i++) {
    if (i === 8 || i === 13 || i === 18 || i === 23) {
      id += '-';
    } else {
      id += characters.charAt(Math.floor(Math.random() * characters.length));
    }
  }

  return id;
};

const checkSubtasks = (subtasks: string[]) =>
  subtasks.filter((subtask) => subtask !== '');

const correctNewTaskFormData = (task: TaskForm): Task => ({
  id: generateID(),
  title: task.title,
  description: task.description,
  status: task.status,
  subtasks: checkSubtasks(task.subtasks).map((subtask) => ({
    id: generateID(),
    isCompleted: false,
    title: subtask,
  })),
});

const arrayEquals = (firstArr: unknown[], secondArr: unknown[]) =>
  Array.isArray(firstArr) &&
  Array.isArray(secondArr) &&
  firstArr.length === secondArr.length &&
  firstArr.every((val, index) => val === secondArr[index]);

const handleColor = (index: number): string => {
  switch (index) {
    case 0:
      return '#49C4E5';
    case 1:
      return '#8471F2';
    case 2:
      return '#67E2AE';
    default:
      return '#49C4E5';
  }
};

const taskNameEllipsis = (name: string): string =>
  name?.length > 17 ? `${name?.slice(0, 17)}...` : name;

export {
  arrayEquals,
  correctNewTaskFormData,
  deslugify,
  generateID,
  handleColor,
  slugify,
  taskNameEllipsis,
};
