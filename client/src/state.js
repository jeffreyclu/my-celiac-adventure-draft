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
  loginFormData: {},
  loginFormError: '',
  loginFormSuccess: '',
  loginFormDisabled: false,
  registerFormData: {},
  registerFormError: '',
  registerFormSuccess: '',
  registerFormDisabled: false,
  loggedIn: false,
  isAdmin: false,
  currentUser: {},
};

export const { useGlobalState } = createGlobalState(initialState);
