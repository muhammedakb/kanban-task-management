import './boardCategoryTitle.scss';

type BoardCategoryTitleProps = {
  color: string;
  piece: number;
  text: string;
};

const BoardCategoryTitle = ({
  color,
  piece,
  text,
}: BoardCategoryTitleProps) => (
  <section className='category__title vertical-center'>
    <span
      className='category__title__color'
      style={{ backgroundColor: color }}
    />
    <span className='category__title__text fw-700-xs'>{`${text} (${piece})`}</span>
  </section>
);

export default BoardCategoryTitle;
