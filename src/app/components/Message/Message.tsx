import './style.css';
import { MessageProps, MessageWithOnMouseEnterHandler } from './types';
import parse from 'html-react-parser';
import { FC, memo as Memo } from 'react';

const MessageFromYou: FC<MessageWithOnMouseEnterHandler> =
	({ text, authorUUID, yourUUID, date, isReaded = false }) => {
		return (
			<div
				className={`message_wrap ${authorUUID === yourUUID ? 'message-from-you' : 'message-from-not-you'} ${!isReaded ? 'message-not-readed' : ''}`}>
				<div className='message-date-your'>
					{new Date(date).toLocaleString('ru-Ru', { hour: '2-digit', minute: '2-digit' })}
				</div>
				<div className={`message ${authorUUID === yourUUID ? 'message_your' : 'message_not_your'}`}>
					<span className='text'>
						{ parse(text) }
					</span>
				</div>
				<div className='cirlce cirlce-you'></div>
			</div >
		)
	}
const MessageFromAnybody: FC<MessageWithOnMouseEnterHandler> =
	({ text, authorUUID, yourUUID, date, isReaded = false }) => {
		return (
			<div
				className={`message_wrap ${authorUUID === yourUUID ? 'message-from-you' : 'message-from-not-you'} ${!isReaded ? 'message-not-readed' : ''}`}>
				<div className='cirlce cirlce-anybody'></div>
				<div className={`message ${authorUUID === yourUUID ? 'message_your' : 'message_not_your'}`}>
					<span className='text'>
						{ parse(text) }
					</span>
				</div>
				<div className='message-date-not-your'>
					{new Date(date).toLocaleString('ru-Ru', { hour: '2-digit', minute: '2-digit' })}
				</div>
			</div >
		)
	}



const Message: FC<MessageProps> = (
	{
		text,
		authorUUID,
		yourUUID,
		date,
		id,
		IsReaded = false }) => {

	if (authorUUID === yourUUID) {
		return <MessageFromYou
			text={text}
			authorUUID={authorUUID}
			yourUUID={yourUUID}
			date={date}
			isReaded={IsReaded}
		/>

	} else {
		return <MessageFromAnybody
			text={text}
			authorUUID={authorUUID}
			yourUUID={yourUUID}
			date={date}
			isReaded={IsReaded}
		/>
	}
}

export default Memo(Message);