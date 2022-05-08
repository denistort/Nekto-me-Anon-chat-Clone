import { FC } from 'react';
import './style.css'
import { MenuButtonProps } from './types';

const MenuButton: FC<MenuButtonProps> =
	({ children, onClick, isChecked = false }) => {
		return (
			<button onClick={onClick} className={`btn ${isChecked ? 'menu-btn-checked' : 'menu-btn'}`}>
				{children}
			</button>
		);
	}

export default MenuButton;