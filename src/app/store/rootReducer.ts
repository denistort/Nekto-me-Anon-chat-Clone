import { combineReducers } from '@reduxjs/toolkit'
// ...
import userReducer from './reducers/User/user.slice';
import topicReducer from './reducers/Topic/topic.slice';
import AppReducer from './reducers/Application/application.slice';
import SearchDataReducer from './reducers/SearchData/search-data.slice';
import ChatReducer from './reducers/Chat/chat.slice';
export const rootReducer = combineReducers({
	userReducer,
	topicReducer,
	AppReducer,
	SearchDataReducer,
	ChatReducer
})

