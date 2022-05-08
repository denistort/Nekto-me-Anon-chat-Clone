export interface Topic {
	justChatting: boolean,
	adult: boolean,
	rolePlay: boolean
}
export const initialState: Topic = {
	justChatting: true,
	adult: false,
	rolePlay: false
}
