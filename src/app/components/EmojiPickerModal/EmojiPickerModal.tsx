import React, { FC } from 'react';
import './style.css';
import { EmojiPickerModalProps } from "@app/components/EmojiPickerModal/types";
import { useAppDispatch, useAppSelector } from "@app/hooks/hooks";
import Picker, { IEmojiData } from 'emoji-picker-react';
import {chatSlice} from "@app/store/reducers/Chat/chat.slice";

const EmojiPickerModal: FC<EmojiPickerModalProps> = () => {
	const { isEmojiModalOpen, chatTextAreaValue } = useAppSelector(state => state.ChatReducer);
	const { setChatTextAreaValue, setCurrentEmoji } = chatSlice.actions;
	const dispatch = useAppDispatch();

	const onEmojiClickHandler = (event: React.MouseEvent, emojiObject: IEmojiData) => {
		console.log(emojiObject);
		dispatch(setChatTextAreaValue(chatTextAreaValue + `:${emojiObject.names[1]}:`))
		dispatch(setCurrentEmoji(`:${emojiObject.names[1]}:`))
	}
	return (
		<div className={`emoji-modal-window ${isEmojiModalOpen 
			? 'emoji-modal-window-open' 
			: 'emoji-modal-window-not-open'}`}>
			<Picker
				onEmojiClick={onEmojiClickHandler} pickerStyle={{ boxShadow: 'none'}}
			/>
		</div>
	)
}

export default EmojiPickerModal;