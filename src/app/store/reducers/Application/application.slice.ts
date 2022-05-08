import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { initialState } from './types';

export const applicationsSlice = createSlice({
	name: 'application',
	initialState,
	reducers: {
		setStatusSearching: (state, action: PayloadAction<boolean>) => {
			state.statusSearching = action.payload;
		},
		setIsChatting: (state, action: PayloadAction<boolean>) => {
			state.isChatting = action.payload;
		},
		setAmountOfOnlineUsers: (state, action: PayloadAction<number>) => {
			state.amount_of_online_users = action.payload;
		},
		setAmountOfSearchingUsers: (state, action: PayloadAction<number>) => {
			state.amount_of_searching_users = action.payload;
		},
	}
})


export default applicationsSlice.reducer;