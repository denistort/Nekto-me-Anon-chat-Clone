import EmojiConvertor from 'emoji-js';
import React, { useEffect, useRef } from "react";

export const useJsEmojiConvertor = () => {
	const emojiConvertor = useRef() as React.MutableRefObject<EmojiConvertor>;
	const sheet = 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple@14.0.0/img/apple/sheets/32.png';
	const path = 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/';

	emojiConvertor.current = new EmojiConvertor();
	emojiConvertor.current.replace_mode = 'img';
	emojiConvertor.current.allow_native = true;
	emojiConvertor.current.img_sets.apple.path = path;
	emojiConvertor.current.img_sets.apple.sheet = sheet;


	const replaceColons = (string: string): string => {
		return emojiConvertor.current.replace_colons(string)
	}
	return { replaceColons }
}