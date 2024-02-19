import { configureStore } from "@reduxjs/toolkit";
import tableReducer, { fetchProducts } from "./reducer";

export const store = configureStore({
  reducer: {
    table: tableReducer,
  },
});

store.dispatch(fetchProducts());

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
