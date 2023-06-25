const Toggles = [
  'ADD_NEW_TASK',
  'ADD_NEW_BOARD',
  'DELETE_BOARD',
  'EDIT_BOARD',
] as const;

type ToggleAction = {
  type: (typeof Toggles)[number];
};

const modalInitialState = {
  isAddNewTaskModalOn: false,
  isAddNewBoardModalOn: false,
  isDeleteBoardModalOn: false,
  isEditBoardModalOn: false,
};

const modalReducer = (
  state: typeof modalInitialState,
  action: ToggleAction
) => {
  switch (action.type) {
    case 'ADD_NEW_TASK':
      return { ...state, isAddNewTaskModalOn: !state.isAddNewTaskModalOn };
    case 'ADD_NEW_BOARD':
      return { ...state, isAddNewBoardModalOn: !state.isAddNewBoardModalOn };
    case 'DELETE_BOARD':
      return { ...state, isDeleteBoardModalOn: !state.isDeleteBoardModalOn };
    case 'EDIT_BOARD':
      return { ...state, isEditBoardModalOn: !state.isEditBoardModalOn };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export { modalInitialState, modalReducer, Toggles };
