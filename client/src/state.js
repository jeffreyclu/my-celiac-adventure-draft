import { createGlobalState } from 'react-hooks-global-state';

const initialState = {
  showForm: false,
  fetched: false,
  formDisabled: false,
  error: '',
  success: '',
  foods: [],
};

export const { useGlobalState } = createGlobalState(initialState);
