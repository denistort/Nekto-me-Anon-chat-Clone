export interface ApplicationState {
	statusSearching: boolean,
	isChatting: boolean,
	amount_of_online_users: number,
	amount_of_searching_users: number
}
export const initialState: ApplicationState = {
	statusSearching: false,
	isChatting: false,
	amount_of_online_users: 0,
	amount_of_searching_users: 0
}