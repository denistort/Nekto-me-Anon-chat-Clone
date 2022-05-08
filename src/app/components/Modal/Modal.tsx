import {FC} from "react";
import {ModalProps} from "@app/components/Modal/type";
import './style.css';

export const Modal:FC<ModalProps> = (
	{ children, isOpen}) => {
	const modalClasslist = `modal ${isOpen ? 'modal-active': 'modal-not-active'}`;
	const layoutClassList = `layout ${isOpen ? 'layout-active': 'layout-not-active'}`;
	return (
		<div className={layoutClassList}>
			<div className={modalClasslist}>
				{
					children
				}
			</div>
		</div>
	)
}

export default Modal;