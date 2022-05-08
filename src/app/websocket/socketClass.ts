import { Events } from '@utilz/Events';
import { RequestChatMessage, RequestConnectionMessage } from './websocket.requset.message.types';
import { ResponseChatMessage } from './websocket.response.message.types';



export const socketHOK = (event: Events, socket: WebSocket) => {
	switch (event) {
		case Events.Message:
			return async (data: RequestChatMessage, callback: (...args: any) => void): Promise<void> => {
				socket.send(JSON.stringify(data))
				callback()
			}
		case Events.Connection:
			return async (data: RequestConnectionMessage) => {
				return socket.send(JSON.stringify(data))
			}
		default:
			break;
	}
}
