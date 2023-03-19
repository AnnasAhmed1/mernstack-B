import { configureStore } from "@reduxjs/toolkit";
import comp_func_reducer from "./componentReducer";
import id_reducer from "./idReducer";
import reducer from "./productReducer";

const store = configureStore({
  reducer: {
    comp_func_reducer: comp_func_reducer,
    id_reducer: id_reducer,
    productReducer: reducer,
  },
});

export default store;
