import { FC } from 'react';
import './style.css';
import { ButtonStartChattingProps } from './types';

const ButtonStartChatting: FC<ButtonStartChattingProps> = 
	({ onClick, children, disabled = false }) => {
	return (
		<button className='button-start-chatting' onClick={onClick} disabled={disabled}>
			{children}
		</button>
	);
}

export default ButtonStartChatting;