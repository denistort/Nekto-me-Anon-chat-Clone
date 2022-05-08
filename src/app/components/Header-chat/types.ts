export interface HeaderProps {
	socketSend: <T>(message: T) => Promise<void>
}