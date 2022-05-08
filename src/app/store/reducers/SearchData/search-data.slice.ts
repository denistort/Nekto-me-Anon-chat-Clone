import { agesInitialState } from '@app/components/Main-menu/types';
import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './types';

export const searchDataSlice = createSlice({
	name: 'search-data',
	initialState,
	reducers: {
		//SET YOUR GENDER
		setYourItGender: (state) => {
			state.yourGender = { it: true, man: false, woman: false };
		},
		setYourManGender: (state) => {
			state.yourGender = { it: false, man: true, woman: false };
		},
		setYourWomanGender: (state) => {
			state.yourGender = { it: false, man: false, woman: true };
		},

		//SET YOUR GENDER
		setInterculorsItGender: (state) => {
			state.genderOfTheInterlocutor = { it: true, man: false, woman: false };
		},
		setInterculorsManGender: (state) => {
			state.genderOfTheInterlocutor = { it: false, man: true, woman: false };
		},
		setInterculorsWomanGender: (state) => {
			state.genderOfTheInterlocutor = { it: false, man: false, woman: true };
		},

		//SET YOUR AGES
		setYourAgeUp17years: (state) => {
			state.yourAge = { ...agesInitialState, upTo17YearsOld: true }
		},
		setYourAgefrom18To21: (state) => {
			state.yourAge = { ...agesInitialState, from18To21: true }
		},
		setYourAgefrom22To25: (state) => {
			state.yourAge = { ...agesInitialState, from22To25: true }
		},
		setYourAgefrom26To35: (state) => {
			state.yourAge = { ...agesInitialState, from26To35: true }
		},
		setYourAgefromOver36: (state) => {
			state.yourAge = { ...agesInitialState, over36: true }
		},


		//SET YOUR ageOfTheInterlocutor
		setInterculorAgeUp17years: (state) => {
			state.ageOfTheInterlocutor = {
				...state.ageOfTheInterlocutor,
				upTo17YearsOld: !state.ageOfTheInterlocutor.upTo17YearsOld
			}
		},
		setInterculorAgefrom18To21: (state) => {
			state.ageOfTheInterlocutor = {
				...state.ageOfTheInterlocutor,
				from18To21: !state.ageOfTheInterlocutor.from18To21
			}
		},
		setInterculorAgefrom22To25: (state) => {
			state.ageOfTheInterlocutor = {
				...state.ageOfTheInterlocutor,
				from22To25: !state.ageOfTheInterlocutor.from22To25
			}
		},
		setInterculorAgefrom26To35: (state) => {
			state.ageOfTheInterlocutor = {
				...state.ageOfTheInterlocutor,
				from26To35: !state.ageOfTheInterlocutor.from26To35
			}
		},
		setInterculorAgefromOver36: (state) => {
			state.ageOfTheInterlocutor = {
				...state.ageOfTheInterlocutor,
				over36: !state.ageOfTheInterlocutor.over36
			}
		},
	}
})


export default searchDataSlice.reducer;