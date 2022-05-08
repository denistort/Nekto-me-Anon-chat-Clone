import React from "react";

export interface MenuProps {
	socketSend: <T>(message: T) => Promise<void>
	children?: React.ReactNode;
}