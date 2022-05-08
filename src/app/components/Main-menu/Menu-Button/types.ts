import React, {ButtonHTMLAttributes, ReactNode} from 'react';

export interface MenuButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	onClick?: (e?: React.MouseEvent) => void,
	children?: ReactNode,
	isChecked?: boolean
}