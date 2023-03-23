import type { FC } from 'react';
import { createPortal } from 'react-dom';

import { useNavbarVisibility } from '../../context/NavbarVisibilityProvider';
import BoardBarItem from '../BoardBarItem';
import ThemeSelector from '../ThemeSelector';

import MobileBoardBar from './MobileBoardBar';

import './boardBar.scss';

export type BoardBarProps = {
  boardItems: Array<{ text: string; onClick: () => void }>;
  onCreate: () => void;
};

const ShowIcon = () => (
  <svg height="11" width="16" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15.815 4.434A9.055 9.055 0 0 0 8 0 9.055 9.055 0 0 0 .185 4.434a1.333 1.333 0 0 0 0 1.354A9.055 9.055 0 0 0 8 10.222c3.33 0 6.25-1.777 7.815-4.434a1.333 1.333 0 0 0 0-1.354ZM8 8.89A3.776 3.776 0 0 1 4.222 5.11 3.776 3.776 0 0 1 8 1.333a3.776 3.776 0 0 1 3.778 3.778A3.776 3.776 0 0 1 8 8.89Zm2.889-3.778a2.889 2.889 0 1 1-5.438-1.36 1.19 1.19 0 1 0 1.19-1.189H6.64a2.889 2.889 0 0 1 4.25 2.549Z"
      fill="#FFF"
    />
  </svg>
);

const BoardBar: FC<BoardBarProps> = ({ boardItems, onCreate }) => {
  const { isMobileMenu, isOpened, setIsOpened } = useNavbarVisibility();

  if (isMobileMenu && isOpened) {
    return createPortal(
      <MobileBoardBar boardItems={boardItems} onCreate={onCreate} />,
      document.body
    );
  }

  if (!isMobileMenu) {
    return isOpened ? (
      <section className="board-bar">
        <header className="board-bar__logo" />
        <main className="board-bar__items">
          <p className="board-bar__items__title fw-700-xs">
            ALL BOARDS ({boardItems.length})
          </p>
          {(boardItems ?? []).map((item) => (
            <BoardBarItem
              key={item.text}
              onClick={item.onClick}
              text={item.text}
            />
          ))}
          <BoardBarItem
            isCreateButton
            onClick={onCreate}
            text="+ Create New Board"
          />
        </main>
        <footer className="board-bar__footer">
          <ThemeSelector />
          <BoardBarItem
            onClick={setIsOpened}
            text="Hide Sidebar"
            type="hideSidebar"
          />
        </footer>
      </section>
    ) : (
      <button
        className="board-bar__show-sidebar center-flex"
        onClick={setIsOpened}
      >
        <ShowIcon />
      </button>
    );
  }
  return null;
};

export default BoardBar;
