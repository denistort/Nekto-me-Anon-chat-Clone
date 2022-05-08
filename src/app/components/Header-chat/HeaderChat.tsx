
import { useAppSelector } from '@app/hooks/hooks';
import { Events } from '@utilz/Events';
import React, {FC, useState} from 'react';
import CustomButton from '../Button';
import './style.css'
import { HeaderProps } from './types';
import Modal from "@app/components/Modal";
import Button from "@app/components/Button/Button";

const HeaderChat: FC<HeaderProps> = ({ socketSend }) => {
	const [modal, setModal] = useState(false);
	const { roomId, isChatEnded } = useAppSelector(state => state.ChatReducer)
	const { uuid } = useAppSelector(state => state.userReducer)
	const stopConversationMessage = async () => { await socketSend({ event: Events.СonversationIsOver, uuid, roomId }) }
	return (
		<header className='main-menu-header'>
			<span>
				Анонминый Чат-Залупа
			</span>

			<span>
				<CustomButton
					disabled={isChatEnded}
					styleObj={{ borderColor: '#70a9ec', color: '#70a9ec', fontWeight: 600 }}
					onClick={() => setModal(true)}>
					Закончить беседу
				</CustomButton>
			</span>

			<Modal isOpen={modal}>
				<h3>Вы уверены что хотите закончить беседу?</h3>
				<div style={{ marginTop: '10px' }}>
					<Button onClick={async () => {
						await stopConversationMessage();
						setModal(false)
					}} styleObj={{ padding: '10px 20px'}}
					>Да</Button>
					<Button
						styleObj={{ marginLeft: '10px', borderColor: 'red', color: 'red', padding: '10px 20px'}}
						onClick={() => setModal(false)}>Нет</Button>
				</div>
			</Modal>
		</header>
	);
}

export default HeaderChat;