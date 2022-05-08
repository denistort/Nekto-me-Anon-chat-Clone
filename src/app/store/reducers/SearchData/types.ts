
export interface GenderInterface {
	it: boolean,
	man: boolean,
	woman: boolean
}

export interface AgesInterface {
	upTo17YearsOld: boolean,
	from18To21: boolean,
	from22To25: boolean,
	from26To35: boolean,
	over36: boolean
}
export interface SearchDataInterface {
	yourGender: GenderInterface;
	genderOfTheInterlocutor: GenderInterface;
	yourAge: AgesInterface;
	ageOfTheInterlocutor: AgesInterface
}


const genderInitialState: GenderInterface = {
	it: true,
	man: false,
	woman: false
}

const agesInitialState: AgesInterface = {
	upTo17YearsOld: false,
	from18To21: false,
	from22To25: false,
	from26To35: false,
	over36: false
}

export const initialState: SearchDataInterface = {
	yourAge: agesInitialState,
	ageOfTheInterlocutor: agesInitialState,
	yourGender: genderInitialState,
	genderOfTheInterlocutor: genderInitialState
}

