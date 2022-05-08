import {
	ResponseConnectionMessage,
	ResponseFoundUserMessage,
	ResponseMessages
} from "@app/websocket/websocket.response.message.types";
import {Events} from "@utilz/Events";

export const fromEventToData = (event: MessageEvent): ResponseMessages => {
	const message = JSON.parse(event.data);
	switch (message.event) {
		case Events.Connection: return message as ResponseConnectionMessage;
		case Events.Found_User: return message as ResponseFoundUserMessage;
		default: return message;
	}
}