import { configureStore } from "@reduxjs/toolkit";
import EventAuthReducer from "./slices/EventAuthReducer";

const store = configureStore({
  reducer: {
    eventAuth: EventAuthReducer,
  },
});
export default store;
