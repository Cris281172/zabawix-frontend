import OfferDetails from "./details/OfferDetails";
import Parameters from "./parameters/Parameters";
import { MdKeyboardArrowDown } from "react-icons/md";
import styles from './tabs.module.scss'
import {useState} from "react";
const Tabs = ({singleData}) => {

	const [activeIndex, setActiveIndex] = useState(['details'])
	console.log(singleData)
	const tabsConfig = [
		{
			id: 'details',
			component: <OfferDetails singleData={singleData} />,
			name: "Szczegóły produktu",
			isVisible: singleData.desc!==undefined
		},
		{
			id: 'parameters',
			component: <Parameters singleData={singleData} />,
			name: "Parametry",
			isVisible: singleData.parameter!==undefined
		},
	]

	const changeActiveIndex = (id) => {
		setActiveIndex(prevState => {
			if (prevState.includes(id)) {
				return prevState.filter(activeId => activeId !== id);
			} else {
				return [...prevState, id];
			}
		});
	}


	return(
		<div className={styles.tabs}>
			{tabsConfig.map((tabItem, index) => (
				<>
					{tabItem.isVisible &&
						<div className={`${styles.tab_item} ${activeIndex.indexOf(tabItem.id) !== -1 ? styles.active : ''}`}>
							<button className={styles.tab_button} onClick={() => changeActiveIndex(tabItem.id)}>
								<span className={styles.tab_button_text}>{tabItem.name}</span>
								<MdKeyboardArrowDown className={styles.tab_button_arrow} />
							</button>
							<div className={styles.tab_content}>
								{tabItem.component}
							</div>
						</div>
					}
				</>
			))}
		</div>
	)
}

export default Tabs;