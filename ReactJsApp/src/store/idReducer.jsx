import { Co2Sharp } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";

const ID_STATE = {
  id: "",
};

const idSlice = createSlice({
  name: "id_data",
  initialState: ID_STATE,
  reducers: {
    idData: (state, action) => {
      console.log("id actions console");
      // ++state.count;
      state.id = action;
      //   console.log("func=>", func);
      //   console.log("state=>", state);
    },
  },
});

export { idSlice };
export const { idData } = idSlice.actions;
const id_reducer = idSlice.reducer;

export default id_reducer;
