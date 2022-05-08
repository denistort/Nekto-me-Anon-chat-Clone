import {SearchingData} from "@app/components/Main-menu/types";
import {AgesInterface, GenderInterface, SearchDataInterface} from "@app/store/reducers/SearchData/types";
import {Topic} from "@app/store/reducers/Topic/types";

export const createSearchObjFromStore =
	(searchDataObjFromStore: SearchDataInterface, topicReducer: Topic): SearchingData => {
	const { genderOfTheInterlocutor, yourGender, yourAge, ageOfTheInterlocutor } = searchDataObjFromStore;
	return {
		interlocutorGender: Object
			.keys(genderOfTheInterlocutor)
			.filter(gender => genderOfTheInterlocutor[gender] === true)[0] as keyof GenderInterface,
		yourGender: Object
			.keys(yourGender)
			.filter(gender => yourGender[gender] === true)[0] as keyof GenderInterface,
		topic: Object
			.keys(topicReducer)
			.filter(topic => topicReducer[topic] === true)[0] as keyof Topic,
		yourAge: Object
			.keys(yourAge)
			.filter(age => yourAge[age] === true)[0] as keyof AgesInterface,
		interlocutorAge: Object
			.keys(ageOfTheInterlocutor)
			.filter(age => ageOfTheInterlocutor[age] === true) as Array<keyof AgesInterface>
	}
}