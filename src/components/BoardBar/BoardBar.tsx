import type { FC } from 'react';
import { createPortal } from 'react-dom';

import { useNavbarVisibility } from '../../context/NavbarVisibilityProvider';
import BoardBarItem from '../BoardBarItem';
import ShowIcon from '../Icons/ShowIcon';
import ThemeSelector from '../ThemeSelector';

import MobileBoardBar from './MobileBoardBar';

import './boardBar.scss';

export type BoardBarProps = {
  boardItems: Array<{ text: string; onClick?: () => void }>;
  onCreate: () => void;
};

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
              onClick={() => item.onClick?.()}
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
