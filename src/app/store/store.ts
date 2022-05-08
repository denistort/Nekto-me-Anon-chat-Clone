import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './rootReducer'
// ...


export const setupStore = () => {
	return configureStore({
		reducer: rootReducer
	})
}
export const store = configureStore({
	reducer: rootReducer
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']