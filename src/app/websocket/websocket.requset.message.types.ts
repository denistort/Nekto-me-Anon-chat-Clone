import { Events } from '@utilz/Events'

export type RequestConnectionMessage = {
	event: Events.Connection
}

export type RequestChatMessage = {
	event: Events.Message;
	uuid: string;
	date: number;
	text: string;
	roomId: string;
}