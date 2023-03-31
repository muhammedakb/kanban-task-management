import type { FC } from 'react';

import BoardBarItem from '../BoardBarItem';
import ThemeSelector from '../ThemeSelector';

import type { BoardBarProps } from './BoardBar';

const MobileBoardBar: FC<BoardBarProps> = ({ boardItems, onCreateClick }) => (
  <div className="mobile-board-bar vertical-center">
    <div className="mobile-board-bar__menu">
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
          onClick={onCreateClick}
          text="+ Create New Board"
        />
      </main>
      <footer className="board-bar__footer">
        <ThemeSelector />
      </footer>
    </div>
  </div>
);

export default MobileBoardBar;
