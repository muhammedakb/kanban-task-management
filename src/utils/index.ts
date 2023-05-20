import type { Task, TaskForm } from 'types/types';

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
  title: task.title,
  description: task.description,
  status: task.status,
  subtasks: checkSubtasks(task.subtasks).map((subtask) => ({
    title: subtask,
    isCompleted: false,
  })),
});

export { correctNewTaskFormData, deslugify, generateID, slugify };
