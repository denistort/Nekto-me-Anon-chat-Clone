import React, { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonStartChattingProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	onClick?: (e?: React.MouseEvent) => void,
	children?: ReactNode,
	disabled?: boolean
}