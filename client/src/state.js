import { createGlobalState } from 'react-hooks-global-state';

const initialState = {
  showForm: false,
  fetched: false,
  formDisabled: false,
  formEditable: false,
  showFormItemOverlay: -1,
  error: '',
  success: '',
  foods: [],
  food: '',
  formData: {},
};

export const { useGlobalState } = createGlobalState(initialState);
