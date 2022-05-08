import { createSlice } from '@reduxjs/toolkit';
import { initialState, Topic } from './types';
export const topicSlice = createSlice({
	name: 'topic',
	initialState,
	reducers: {
		setOnJustChatting: (state) => {
			state.justChatting = true;
			state.adult = false;
			state.rolePlay = false;
		},
		setOnAdult: (state) => {
			state.justChatting = false;
			state.adult = true;
			state.rolePlay = false;
		},
		setOnRolePlay: (state) => {
			state.justChatting = false;
			state.adult = false;
			state.rolePlay = true;
		},
	}
})


export default topicSlice.reducer;