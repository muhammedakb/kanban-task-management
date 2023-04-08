enum Toggles {
  ITEM_DETAIL = 'ITEM_DETAIL',
  ADD_NEW_COLUMN = 'ADD_NEW_COLUMN',
  EDIT_TASK = 'EDIT_TASK',
  DELETE_TASK = 'DELETE_TASK',
}

type ToggleAction = {
  type: Toggles;
};

const modalInitialState = {
  isItemDetailModalOn: false,
  isAddNewColumnModalOn: false,
  isEditTaskModalOn: false,
  isDeleteTaskModalOn: false,
};

const modalReducer = (
  state: typeof modalInitialState,
  action: ToggleAction
) => {
  switch (action.type) {
    case 'ITEM_DETAIL':
      return { ...state, isItemDetailModalOn: !state.isItemDetailModalOn };
    case 'ADD_NEW_COLUMN':
      return { ...state, isAddNewColumnModalOn: !state.isAddNewColumnModalOn };
    case 'EDIT_TASK':
      return { ...state, isEditTaskModalOn: !state.isEditTaskModalOn };
    case 'DELETE_TASK':
      return { ...state, isDeleteTaskModalOn: !state.isDeleteTaskModalOn };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export { modalInitialState, modalReducer, Toggles };
