import { ResponseChatMessage } from '@app/websocket/websocket.response.message.types';
import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { initialState } from './types';

export const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		setIsChatEnded: (state, action: PayloadAction<boolean>) => {
			state.isChatEnded = action.payload;
		},
		setInterculorUUID: (state, action: PayloadAction<string | null>) => {
			state.interculorUuid = action.payload;
		},
		setConversation: (state, action: PayloadAction<ResponseChatMessage[]>) => {
			state.conversation = action.payload;
		},
		addMessage: (state, action: PayloadAction<ResponseChatMessage>) => {
			state.conversation = [action.payload, ...state.conversation];
		},
		setIsInterculorTyping: (state, action: PayloadAction<boolean>) => {
			state.isInterculorTyping = action.payload;
		},
		setRoomUUID: (state, action: PayloadAction<string | null>) => {
			state.roomId = action.payload;
		},
		setWhoStoppedConversation: (state, action: PayloadAction<string | null>) => {
			state.whoStoppedConversation = action.payload;
		},
		setChatTextAreaValue: (state, action: PayloadAction<string>) => {
			state.chatTextAreaValue = action.payload;
		},

		toggleEmojiModal: (state) => {
			state.isEmojiModalOpen = !state.isEmojiModalOpen;
		},
		setCurrentEmoji: (state, action: PayloadAction<string>) => {
			state.currentEmoji = action.payload;
		},
	}
})

export default chatSlice.reducer;