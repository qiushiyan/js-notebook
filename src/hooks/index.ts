import store, { RootState } from "../redux/store";
import {
  TypedUseSelectorHook,
  useDispatch as _useDispatch,
  useSelector as _useSelector,
} from "react-redux";
import { bindActionCreators } from "redux";
import { moveCell, updateCell, insertCell, deleteCell } from "../redux";

type AppDispatch = typeof store.dispatch;

// Export typed version of useDispatch and useSelector
export const useDispatch = () => _useDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = _useSelector;

// action creators
const actionCreators = {
  moveCell,
  updateCell,
  insertCell,
  deleteCell,
};
export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actionCreators, dispatch);
};
