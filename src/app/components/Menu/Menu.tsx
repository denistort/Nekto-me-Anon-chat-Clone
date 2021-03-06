import React, {FC, useCallback} from "react";
import MenuButton from "@app/components/Main-menu/Menu-Button";
import ButtonStartChatting from "@app/components/Main-menu/Button-Start-Chatting";
import {useAppDispatch, useAppSelector} from "@app/hooks/hooks";
import MenuFooter from "@app/components/Menu-footer";
import {topicSlice} from "@app/store/reducers/Topic/topic.slice";
import {searchDataSlice} from "@app/store/reducers/SearchData/search-data.slice";
import {MenuProps} from "@app/components/Menu-footer/type";
import {createSearchObjFromStore} from "@utilz/createSearchObjFromStore";
import {Events} from "@utilz/Events";
import {applicationsSlice} from "@app/store/reducers/Application/application.slice";

const Menu: FC<MenuProps> = ({ socketSend, children }) => {
	const dispatch = useAppDispatch();
	const { uuid } = useAppSelector(state => state.userReducer)
	const { topicReducer, SearchDataReducer } = useAppSelector(state => state)
	const {
		yourAge,
		yourGender,
		ageOfTheInterlocutor,
		genderOfTheInterlocutor } = useAppSelector(state => state.SearchDataReducer)
	const { setOnAdult, setOnJustChatting, setOnRolePlay } = topicSlice.actions
	const { setYourItGender, setYourManGender, setYourWomanGender } = searchDataSlice.actions
	const {setInterculorsItGender, setInterculorsManGender, setInterculorsWomanGender } = searchDataSlice.actions
	const { setStatusSearching } = applicationsSlice.actions
	const {
		setYourAgeUp17years,
		setYourAgefrom18To21,
		setYourAgefrom22To25,
		setYourAgefrom26To35,
		setYourAgefromOver36 } = searchDataSlice.actions

	const {
		setInterculorAgeUp17years,
		setInterculorAgefrom18To21,
		setInterculorAgefrom22To25,
		setInterculorAgefrom26To35,
		setInterculorAgefromOver36
	} = searchDataSlice.actions

	const sendSearchinParams = async () =>
	{
		const data = createSearchObjFromStore(SearchDataReducer, topicReducer);
		const reply = {
			event: Events.Searching,
			uuid: uuid,
			data: data
		}
		dispatch(setStatusSearching(true))
		await socketSend(reply)
	}

	const isNotChooseAge = useCallback(() => {
		const res = Object.keys(yourAge).filter(age => yourAge[age] === true);
		const res2 = Object.keys(ageOfTheInterlocutor).filter(age => ageOfTheInterlocutor[age] === true)
		return res.length === 0 || res2.length === 0;
	}, [yourAge, ageOfTheInterlocutor]);


	return (
		<div className='menu'>

			<div className='wrp'>
				<h3 className='h3-custom'>
					???????? ?????? ????????????????????
				</h3>
				<div className='buttons-row'>
					<MenuButton
						onClick={() => dispatch(setOnJustChatting())}
						isChecked={topicReducer.justChatting}>??????????????</MenuButton>
					<MenuButton
						onClick={() => dispatch(setOnAdult())}
						isChecked={topicReducer.adult}>?????????? 18+</MenuButton>
					<MenuButton
						onClick={() => dispatch(setOnRolePlay())}
						isChecked={topicReducer.rolePlay}>????????????</MenuButton>
				</div>
			</div>


			<div className='two-columns-wraper'>
				<div style={{ display: 'flex', width: '100%', gap: '30px' }}>
					<div style={{ width: '50%' }}>
						<h3 className='h3-custom'>
							?????? ??????:
						</h3>
						<div style={{ display: 'flex' }}>
							<MenuButton
								isChecked={yourGender.it}
								onClick={() => { dispatch(setYourItGender()) }}
							>??????</MenuButton>
							<MenuButton
								isChecked={yourGender.woman}
								onClick={() => { dispatch(setYourWomanGender()) }}
							>??????</MenuButton>
							<MenuButton
								isChecked={yourGender.man}
								onClick={() => { dispatch(setYourManGender()) }}
							>????</MenuButton>
						</div>
					</div>

					<div style={{ width: '50%' }}>
						<h3 className='h3-custom'>
							?????? ??????????????????????:
						</h3>
						<div style={{ display: 'flex' }}>
							<MenuButton
								isChecked={genderOfTheInterlocutor.it}
								onClick={() => { dispatch(setInterculorsItGender()) }}
							>??????</MenuButton>
							<MenuButton
								isChecked={genderOfTheInterlocutor.woman}
								onClick={() => { dispatch(setInterculorsWomanGender()) }}
							>??????</MenuButton>
							<MenuButton
								isChecked={genderOfTheInterlocutor.man}
								onClick={() => { dispatch(setInterculorsManGender()) }}
							>????</MenuButton>
						</div>
					</div>
				</div>
			</div>

			<div className='two-columns-wraper'>
				<div className='select-age-wrapper'>
					<h3 className='h3-custom'>
						??????: ??????????????
					</h3>
					<MenuButton
						isChecked={yourAge.upTo17YearsOld}
						onClick={() => dispatch(setYourAgeUp17years())}
					>???? 17 ??????</MenuButton>
					<MenuButton
						isChecked={yourAge.from18To21}
						onClick={() => dispatch(setYourAgefrom18To21())}
					>???? 18 ???? 21 ????????</MenuButton>
					<MenuButton
						isChecked={yourAge.from22To25}
						onClick={() => dispatch(setYourAgefrom22To25())}
					>???? 22 ???? 25 ??????</MenuButton>
					<MenuButton
						isChecked={yourAge.from26To35}
						onClick={() => dispatch(setYourAgefrom26To35())}
					>???? 26 ???? 35 ??????</MenuButton>
					<MenuButton
						isChecked={yourAge.over36}
						onClick={() => dispatch(setYourAgefromOver36())}
					>???????????? 36</MenuButton>
				</div>

				<div className='select-age-wrapper'>
					<h3 className='h3-custom'>
						?????????????? ??????????????????????:
					</h3>
					<MenuButton
						isChecked={ageOfTheInterlocutor.upTo17YearsOld}
						onClick={() => dispatch(setInterculorAgeUp17years())}
					>???? 17 ??????</MenuButton>
					<MenuButton
						isChecked={ageOfTheInterlocutor.from18To21}
						onClick={() => dispatch(setInterculorAgefrom18To21())}
					>???? 18 ???? 21 ????????</MenuButton>
					<MenuButton
						isChecked={ageOfTheInterlocutor.from22To25}
						onClick={() => dispatch(setInterculorAgefrom22To25())}
					>???? 22 ???? 25 ??????</MenuButton>
					<MenuButton
						isChecked={ageOfTheInterlocutor.from26To35}
						onClick={() => dispatch(setInterculorAgefrom26To35())}
					>???? 26 ???? 35 ??????</MenuButton>
					<MenuButton
						isChecked={ageOfTheInterlocutor.over36}
						onClick={() => dispatch(setInterculorAgefromOver36())}
					>???????????? 36</MenuButton>
				</div>
			</div>

			<div className='button-start-wrapper'>
				<ButtonStartChatting onClick={sendSearchinParams} disabled={isNotChooseAge()}>
					???????????? ??????
				</ButtonStartChatting>
			</div>

			{
				children
			}
		</div>
	)
}
export default Menu;