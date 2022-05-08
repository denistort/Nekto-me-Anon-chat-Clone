import React, { ReactNode, ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	disabled?: boolean,
	children?: ReactNode,
	styleObj?: React.CSSProperties,
	onClick: () => void
}