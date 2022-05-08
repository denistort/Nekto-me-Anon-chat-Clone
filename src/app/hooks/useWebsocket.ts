import React, {useEffect, useRef} from 'react';
import {Events} from "@utilz/Events";

export interface useWebSocketOptions {
	readonly SOCKET_URL: string;
	onOpen?: (this: WebSocket, ev: Event) => void;
	onMessage?: (this: WebSocket, ev: MessageEvent) => void;
	onError?: (this: WebSocket, ev: Event) => void;
	onClose?: (this: WebSocket, ev: CloseEvent) => void;
}


export const useWebsocket = (
	{ SOCKET_URL, onOpen, onMessage, onClose, onError }: useWebSocketOptions) => {
	const socket = useRef() as React.MutableRefObject<WebSocket>;

	const socketSend = async function <T>(message: T) { socket.current.send(JSON.stringify(message)) };

	useEffect(() => {
		socket.current = new WebSocket(SOCKET_URL);
		socket.current.onopen = () => {
			console.log('Подключение установлено')
			const message = {
				event: Events.Connection
			}
			socket.current.send(JSON.stringify(message))
		};
		socket.current.onmessage = onMessage;
		socket.current.onclose = onClose;
		socket.current.onerror = onError;
	},[SOCKET_URL])
	console.log(socket.current)
	return {
		SocketInstance: socket.current, socketSend,
	}
}