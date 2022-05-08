import { ResponseChatMessage } from '@app/websocket/websocket.response.message.types';

export const thereAreAnyNotReadedMessage =
	(conversation: Array<ResponseChatMessage>, interculorUuid: string): boolean => {
		let res = false;
		conversation.forEach(message => {
			if (message.uuid === interculorUuid) {
				if (message.isReaded === false) {
					res = true;
				}
			}

		})

		return res
	}