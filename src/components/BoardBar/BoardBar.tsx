import type { FC } from 'react';
import { createPortal } from 'react-dom';

import { useNavbarVisibility } from '@context/NavbarVisibilityProvider';
import { useTheme } from '@context/ThemeProvider';

import BoardBarItem from '../BoardBarItem';
import ShowIcon from '../Icons/ShowIcon';
import ThemeSelector from '../ThemeSelector';

import MobileBoardBar from './MobileBoardBar';

import './boardBar.scss';

export type BoardBarProps = {
  boardItems: Array<{ text: string; onClick?: () => void }>;
  onCreateClick: () => void;
};

const BoardBar: FC<BoardBarProps> = ({ boardItems, onCreateClick }) => {
  const { isMobileMenu, isOpened, setIsOpened } = useNavbarVisibility();
  const { theme } = useTheme();

  if (isMobileMenu && isOpened) {
    return createPortal(
      <MobileBoardBar boardItems={boardItems} onCreateClick={onCreateClick} />,
      document.body
    );
  }

  if (!isMobileMenu) {
    return isOpened ? (
      <section className={`board-bar ${theme}`}>
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
            onClick={onCreateClick}
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
