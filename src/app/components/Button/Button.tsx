import { FC, memo as Memo } from 'react';
import './style.css'
import { ButtonProps } from './types';


const CustomButton: FC<ButtonProps> = (
	{ onClick, children, styleObj, disabled = false }) => {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className='button-send'
			style={styleObj}
		>
			{children}
		</button>
	);
}

export default Memo(CustomButton);