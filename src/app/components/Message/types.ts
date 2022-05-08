export interface MessageProps {
	text: string,
	authorUUID: string,
	yourUUID: string,
	date: number,
	id?: number,
	socketSend: <T>(message: T) => Promise<void>,
	IsReaded: boolean
}

export type MessagePropsWithoutSocket = Omit<MessageProps, 'socketSend' | 'IsReaded'>
export interface MessageWithOnMouseEnterHandler extends MessagePropsWithoutSocket {
	isReaded: boolean;
}