import { createGlobalState } from 'react-hooks-global-state';

const initialState = {
  showAddFoodForm: false,
  addFoodFormFetched: false,
  addFoodFormDisabled: false,
  addFoodFormEditable: false,
  addFoodFormError: '',
  addFoodFormSuccess: '',
  addFoodFormFoods: [],
  addFoodFormSelectedFood: '',
  addFoodFormData: {},
  showAddFoodFormItemOverlay: -1,
  userFormData: {},
  userFormSuccess: '',
  userFormError: '',
  userFormDisabled: false,

  loggedIn: false,
  isAdmin: false,
  currentUser: {},
};

export const { useGlobalState } = createGlobalState(initialState);
