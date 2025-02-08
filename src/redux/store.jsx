import { configureStore } from "@reduxjs/toolkit";
import studentsReducer from "./studentsReducer";

const store = configureStore({
  reducer: {
    students: studentsReducer, // Adds studentsReducer to the store
  },
});

export default store;
