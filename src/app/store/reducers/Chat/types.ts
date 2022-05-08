import { ResponseChatMessage } from '@app/websocket/websocket.response.message.types'

export interface ChatState {
	isChatEnded: boolean;
	interculorUuid: string | null;
	whoStoppedConversation: string | null;
	conversation: Array<ResponseChatMessage>;
	isInterculorTyping: boolean;
	roomId: string | null;
	isEmojiModalOpen: boolean;
	currentEmoji: string;
	chatTextAreaValue: string;
}
export const initialState: ChatState = {
	isChatEnded: false,
	interculorUuid: null,
	conversation: [],
	isInterculorTyping: false,
	roomId: null,
	whoStoppedConversation: null,
	isEmojiModalOpen: false,
	currentEmoji: ':wave:',
	chatTextAreaValue: ''
}