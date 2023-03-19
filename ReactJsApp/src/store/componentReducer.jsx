import { Co2Sharp } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";

const COMP_FUNC_STATE = {
  value: "",
  count: 0,
};

const compFuncSlice = createSlice({
  name: "comp_funtion",
  initialState: COMP_FUNC_STATE,
  reducers: {
    comp_function: (state, func) => {
      console.log("actions console");
      ++state.count;
      state.value = func;
      //   console.log("func=>", func);
      //   console.log("state=>", state);
    },
  },
});

export { compFuncSlice };
export const { comp_function } = compFuncSlice.actions;
const comp_func_reducer = compFuncSlice.reducer;

export default comp_func_reducer;
