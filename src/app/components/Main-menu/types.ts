import { AgesInterface, GenderInterface } from '@app/store/reducers/SearchData/types'
import { Topic } from '@app/store/reducers/Topic/types'

export const topicsInitialState = {
	justChatting: true,
	adult: false,
	rolePlay: false
}

export const agesInitialState = {
	upTo17YearsOld: false,
	from18To21: false,
	from22To25: false,
	from26To35: false,
	over36: false
}
export const genderInitialState = {
	it: true,
	man: false,
	woman: false
}

export interface SearchingData {
	interlocutorGender: keyof GenderInterface,
	yourGender: keyof GenderInterface,
	topic: keyof Topic,
	yourAge: keyof AgesInterface,
	interlocutorAge: Array<keyof AgesInterface>
}
