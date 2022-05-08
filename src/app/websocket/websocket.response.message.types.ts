import { Events } from '@utilz/Events'

export type ResponseConnectionMessage = {
	event: Events.Connection,
	uuid: string,
	amount_online_users: number,
	amount_of_searching_users: number
}
export type ResponseFoundUserMessage = {
	event: Events.Found_User,
	uuid: string,
	roomId: string,
	interculorUUID: string
}

export type ResponseCloseMessage = {
	user: string,
	event: Events.Close,
	amount_of_online_users: number,
	amount_of_searching_users: number
}

export type ResponseChatMessage = {
	event: Events.Message,
	uuid: string,
	date: number,
	text: string,
	isReaded: boolean
	roomId: string,
}

export type ResponseConversationOverNessage = {
	event: Events.СonversationIsOver,
	uuid: string,
	roomId: string
}
export type ResponseMessageReadedMessage = {
	event: Events.MessageReaded,
	messages: Array<ResponseChatMessage>
}
export type ResponseTypingMessage = { event: Events.Typing }
export type ResponseStopTypingMessage = { event: Events.Stop_typing }

export type ResponseCancelSearching = { event: Events.Cancel_searching, uuid: string }
export type ResponseMessages = ResponseConnectionMessage
	| ResponseFoundUserMessage
	| ResponseCloseMessage
	| ResponseChatMessage
	| ResponseConversationOverNessage
	| ResponseMessageReadedMessage
	| ResponseTypingMessage
	| ResponseStopTypingMessage
	| ResponseCancelSearching