import { Events } from '@utilz/Events';
import React, {FC, lazy, useEffect, useMemo, useRef, useState} from 'react';
import './style.css';
import { useAppDispatch, useAppSelector } from '@app/hooks/hooks';
import { userSlice } from '@app/store/reducers/User/user.slice';
import { applicationsSlice } from '@app/store/reducers/Application/application.slice';
import { chatSlice } from '@app/store/reducers/Chat/chat.slice';
import { fromEventToData } from "@utilz/fromEventToData";
import { SOCKET_CONNECTION_URL } from "@app/websocket/Websocket";
import {useWebsocket, useWebSocketOptions} from "@app/hooks/useWebsocket";
import Menu from "@app/components/Menu";
import MenuFooter from "@app/components/Menu-footer";
import Header from "@app/components/Header";
import Button from "@app/components/Button";
import Modal from "@app/components/Modal";
import { useSoundMessageHandler } from "@app/hooks/useSoundMessageHandler";

const LoadingScreen = lazy(() => import('@app/components/Loading-Screen'));
const Chat = lazy(() => import('../Chat'));


const Main: FC = () => {
	const [init, setInit] = useState(true)
	const [modal, setModal] = useState(false)
	const dispatch = useAppDispatch();
	const {
		statusSearching,
		amount_of_online_users,
		amount_of_searching_users,
		isChatting
	} = useAppSelector(state => state.AppReducer)
	const { uuid } = useAppSelector(state => state.userReducer)
	const { setUuid } = userSlice.actions;
	const {
		setAmountOfOnlineUsers,
		setAmountOfSearchingUsers,
		setStatusSearching,
		setIsChatting
	} = applicationsSlice.actions
	const {
		setConversation,
		setInterculorUUID,
		setIsChatEnded,
		setIsInterculorTyping,
		setRoomUUID,
		addMessage,
		setWhoStoppedConversation
	} = chatSlice.actions
	const { soundMessage } = useSoundMessageHandler();
	const useWebSocketOptions = useMemo(() => {
		return ({
			SOCKET_URL: SOCKET_CONNECTION_URL,
			onMessage: (event) => {
				const message = fromEventToData(event)
				console.log(message)
				switch (message.event) {
					case Events.Connection:
						if (init) {
							dispatch(setUuid(message.uuid))
							setInit(false);
						}
						dispatch(setAmountOfOnlineUsers(message.amount_online_users))
						dispatch(setAmountOfSearchingUsers(message.amount_of_searching_users))
						break;
					case Events.Close:
						dispatch(setAmountOfOnlineUsers(message.amount_of_online_users))
						dispatch(setAmountOfSearchingUsers(message.amount_of_searching_users))
						break;
					case Events.Found_User:
						dispatch(setConversation([]))
						dispatch(setIsChatting(true))
						dispatch(setIsChatEnded(false))
						dispatch(setInterculorUUID(message.interculorUUID))
						dispatch(setRoomUUID(message.roomId))
						dispatch(setStatusSearching(false))
						break;
					case Events.Message:
						if(uuid === message.uuid) soundMessage()
						dispatch(addMessage(message))
						break;
					case Events.СonversationIsOver:
						dispatch(setIsChatEnded(true))
						dispatch(setWhoStoppedConversation(message.uuid))
						break;
					case Events.MessageReaded:
						console.log(message)
						dispatch(setConversation(message.messages))
						break;
					case Events.Typing:
						dispatch(setIsInterculorTyping(true))
						break;
					case Events.Stop_typing:
						dispatch(setIsInterculorTyping(false))
						break;
					case Events.Cancel_searching:
						dispatch(setStatusSearching(false))
						break;
					default:
						break;
				}
			},
			onError: () => console.log(`Подключение завершилось с ошибкой`),
			onClose: () => console.log(`Подключение закрылось`)
		});
	},[]) as useWebSocketOptions;

	useEffect(() => {
		const getAudioContext = () => {
			soundMessage()
		}
		window.addEventListener('click', getAudioContext);
		return () => {
			window.removeEventListener('click', getAudioContext);
		}
	}, [])
	const { SocketInstance, socketSend } = useWebsocket(useWebSocketOptions);

	const sendCancelSearchingMessage = async () => {
		const reqMessage = {
			event: Events.Cancel_searching,
			uuid
		}
		await socketSend(reqMessage)
	}
	//LOADING SEARCHING USER
	if (statusSearching) {
		return (
			<main className='main-wrapper'>
				<Header />
				<LoadingScreen text={'Поиск собеседника...'}>
					<Button
						styleObj={{ borderColor: '#70a9ec', color: '#70a9ec' }}
						onClick={() => setModal(true)}>Отменить Поиск</Button>
					<Modal isOpen={modal}>
						<h3>Вы уверены что хотите отменить поиск?</h3>
						<div style={{ marginTop: '10px' }}>
							<Button onClick={async () => {
								await sendCancelSearchingMessage();
								setModal(false)
							}} styleObj={{ padding: '10px 20px'}}
							>Да</Button>
							<Button
								styleObj={{ marginLeft: '10px', borderColor: 'red', color: 'red', padding: '10px 20px'}}
								onClick={() => setModal(false)}>Нет</Button>
						</div>
					</Modal>
				</LoadingScreen>
			</main>
		)
	}

	//MENU
	if (!statusSearching && !isChatting) {
		return (
			<main className='main-wrapper'>
				<Header />
				<Menu socketSend={socketSend}>
					<MenuFooter onlineUsers={amount_of_online_users} searchingUsers={amount_of_searching_users} />
				</Menu>
			</main>
		);
	}

	//CHAT
	if (isChatting) {
		return (
			<Chat socketInstance={SocketInstance} socketSend={socketSend} />
		)
	}
}

export default Main;