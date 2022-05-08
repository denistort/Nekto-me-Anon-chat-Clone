import boopSfx from '../../assets/sounds/message-incoming.mp3';
import useSound from 'use-sound';

export const useSoundMessageHandler = () => {
	const [play] = useSound(boopSfx);
	return {
		soundMessage: () => play(),
	}
}