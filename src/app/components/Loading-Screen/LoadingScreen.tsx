import {FC} from "react";
import {LoadingScreenProps} from "@app/components/Loading-Screen/types";
import {SpinnerDotted} from "spinners-react";

const LoadingScreen: FC<LoadingScreenProps> = ({ text, children }) => {
	return (
		<main className='main-wrapper' style={{ height: '100vh', overflow: 'hidden' }}>

			<div style={{
				width: '150%',
				height: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				overflow: 'hidden',
				flexDirection: 'column'
			}}>
				<div className='spinner-wrap '>
					<SpinnerDotted size={100} color={'#b4b4b4'} />
					<span>{text}</span>
				</div>
				<div style={{ marginTop: '15px' }}>
					{
						children
					}
				</div>
			</div>

		</main>
	)
}

export default LoadingScreen;