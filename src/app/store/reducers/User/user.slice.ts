import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
	uuid: string | null
}
const initialState: UserState = {
	uuid: null
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUuid: (state, action: PayloadAction<string | null>) => {
			console.log(`Устанавливается такой вот юайди ${action.payload}`)
			state.uuid = action.payload;
			console.log(`Стейт ${JSON.stringify(state)}`)
		}
	}
})


export default userSlice.reducer;