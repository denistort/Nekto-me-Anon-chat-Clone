import React, { FC } from 'react';
import CustomButton from '../Button/Button';
import Message from '../Message/Message';
import './style.css';
import { Events } from '@utilz/Events';
import { IChat } from './types';
import { useAppDispatch, useAppSelector } from '@app/hooks/hooks';
import HeaderChat from '../Header-chat';
import { applicationsSlice } from '@app/store/reducers/Application/application.slice';
import { socketHOK } from '@app/websocket/socketClass';
import { ResponseChatMessage } from '@app/websocket/websocket.response.message.types';
import { thereAreAnyNotReadedMessage } from '@utilz/thereareAnyReadedMessage';
import { chatSlice } from '@app/store/reducers/Chat/chat.slice';
import {createSearchObjFromStore} from "@utilz/createSearchObjFromStore";

import EmojiPickerModal from "@app/components/EmojiPickerModal";
import {useJsEmojiConvertor} from "@app/hooks/useJsEmojiConvertor";
import parse from 'html-react-parser';

const Chat: FC<IChat> = ({ socketSend, socketInstance }) => {
	const dispatch = useAppDispatch();
	const {
		conversation,
		isChatEnded,
		isInterculorTyping,
		interculorUuid,
		roomId,
		whoStoppedConversation,
		currentEmoji,
		chatTextAreaValue,
		isEmojiModalOpen
	} = useAppSelector(state => state.ChatReducer)
	const { topicReducer, SearchDataReducer } = useAppSelector(state => state)
	const { setStatusSearching, setIsChatting } = applicationsSlice.actions
	const { setIsInterculorTyping, toggleEmojiModal, setChatTextAreaValue } = chatSlice.actions
	const { uuid } = useAppSelector(state => state.userReducer)
	const socketSendMessageEvent = socketHOK(Events.Message, socketInstance)
	const { replaceColons } = useJsEmojiConvertor();
	const collectInformation = async () => {
		const data = createSearchObjFromStore(SearchDataReducer, topicReducer);
		const reply = {
			event: Events.Searching,
			uuid: uuid,
			data: data
		}
		dispatch(setStatusSearching(true))
		await socketSend(reply)
	}
	const sendStopTyping = async () => {
		dispatch(setIsInterculorTyping(false))
		const message = {
			event: Events.Stop_typing,
			roomId,
			interculorUuid
		}
		await socketSend(message)
	}
	const onKeyUpHandler = (event: React.KeyboardEvent) => {
		if(event.key === 'Tab') {
			dispatch(toggleEmojiModal())
		}
		if (!event.shiftKey) {
			if (event.code === 'Enter' || event.code === 'NumpadEnter') {
				event.preventDefault();
				if (chatTextAreaValue.length > 0) {
					return sendMessage();
				}
			}
		}
		socketSend({event: Events.Typing, interculorUuid, roomId})
 	}
	const sendMessage = async () => {
		const message = {
			event: Events.Message,
			uuid: uuid,
			date: Date.now(),
			text: chatTextAreaValue,
			roomId: roomId,
		}
		// await socketSend(message)
		await socketSendMessageEvent(message as never, async () => {
			if (isEmojiModalOpen) dispatch(toggleEmojiModal())
			dispatch(setChatTextAreaValue(''))
			await sendStopTyping()
		})
	}
	const SocketEventsHandler = (message: ResponseChatMessage) => {
		switch (message.event) {
			case Events.Message:
				return <Message
					key={message.date}
					text={replaceColons(message.text)}
					authorUUID={message.uuid}
					yourUUID={uuid}
					date={message.date}
					id={message.date}
					socketSend={socketSend}
					IsReaded={message.isReaded}
				/>
		}
	}
	const sendEventMessageReaded = async () => {
		if(!isChatEnded) {
			if (thereAreAnyNotReadedMessage(conversation, interculorUuid) === true) {
				const eventMessageReaded = {
					event: Events.MessageReaded,
					roomId,
					interculorUuid,
					uuid
				}
				await socketSend(eventMessageReaded)
			}
		}
	}

	const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		dispatch(setChatTextAreaValue(e.target.value))
		if (chatTextAreaValue.length === 0) { }
	}
	const onClickEmojiToggleModalHandler = () => {
		dispatch(toggleEmojiModal())
	}
	return (
		<main className='main-wrapper' style={{ height: '100vh', overflow: 'hidden' }}>
			<HeaderChat socketSend={socketSend} />
			<section className='message-board' onMouseEnter={sendEventMessageReaded}>
				{
					conversation.map(message => SocketEventsHandler(message))
				}

				<div className='user-connected'>
					<hr className='line' />
					<span className='start-conv'>{`Пользователь найден - Общайтесь`}</span>
					<hr className='line' />
				</div>
				<div className='user-typing'>
					{
						isInterculorTyping ? 'Собеседник набирает сообщение...' : null
					}
				</div>

			</section>
			{isChatEnded && <div className='conversation-ended'>{`${uuid === whoStoppedConversation
				? 'Вы остановили беседу'
				: 'Cобеседник остановил беседу'}`}
				<div className='conversation-ended__buttons'>
					<CustomButton
						styleObj={{ padding: '.7rem', border: '2px solid #70a9ec', color: '#70a9ec', font: '16px', fontWeight: 'bold' }}
						onClick={() => {
							dispatch(setStatusSearching(false))
							dispatch(setIsChatting(false))
						}}
					>Изменить параметры</CustomButton>
					<CustomButton
						styleObj={{ padding: '.7rem', border: '2px solid #3bb93b', color: '#3bb93b', font: '16px', fontWeight: 'bold' }}
						onClick={() => collectInformation()}
					>Начать новый чат</CustomButton>
				</div>
			</div>}
			{!isChatEnded && <div className='message-form'>
				<div className='message-wrapper'>
					<textarea
						value={chatTextAreaValue}
						onKeyUp={e => onKeyUpHandler(e)}
						onChange={onChangeHandler}
						className="text-area"
						name="input-text"
						placeholder='Введите сообщение'></textarea>
					<div className='emoji-toggle-button' onClick={onClickEmojiToggleModalHandler}>
						{ parse(
								replaceColons(currentEmoji)
						) }
					</div>
					<EmojiPickerModal />
					<div className='button-wrapper'>
						<CustomButton
							disabled={chatTextAreaValue.length <= 0}
							onClick={sendMessage}
						>
							Отправить
						</CustomButton>
					</div>
				</div>
				<div className='form-cirlce'></div>
			</div>}
		</main>
	);
}

export default Chat;