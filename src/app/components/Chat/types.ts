export interface IChat {
	socketSend: <T>(message: T) => Promise<void>;
	socketInstance: WebSocket;
}