import React, {FC} from "react";
export interface MenuFooterProps {
	onlineUsers: number;
	searchingUsers: number;
	children?: React.ReactNode;
}
const MenuFooter: FC<MenuFooterProps> = (
	{ onlineUsers, searchingUsers, children}) => {

	const date = new Date()
		.toLocaleDateString('ru-Ru', { month: "long", day: "2-digit", year: "numeric"})
	return (
		<footer className='menu-footer'>
			<p>Сейчас онлайн: <b>{onlineUsers} пользователей</b></p>
			<p>Сейчас ищут с кем пообщаться: <b>{onlineUsers} пользователей</b></p>
			{
				children
			}
			<p style={{ paddingTop: '20px' }}>
				{
					date
				}
			</p>
		</footer>
	)
}

export default MenuFooter;