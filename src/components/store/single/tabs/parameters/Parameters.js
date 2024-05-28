import styles from './parameters.module.scss'
import parametersConfig from "../../../../../config/parametersConfig";
const Parameters = ({singleData}) => {
	if(!singleData.parameter){
		return
	}

	const findTitleBySlug = (config, slug) => {
		const found = config.find(item => item.slug === slug);
		return found ? found.title : slug;
	};

	const parameterConfig = {
		brand: {
			label: 'Marka',
			format: (value) => findTitleBySlug(parametersConfig.brand, value)
		},
		age: {
			label: 'Wiek',
			format: (value) => `+ ${value}`
		},
		ean: {
			label: 'Kod EAN',
			format: (value) => value
		},
		packageSize: {
			label: 'Rozmiar pudełka',
			format: (value) => `${value.length} cm x ${value.width} cm x ${value.height} cm`
		},
		productSize: {
			label: 'Rozmiar produktu',
			format: (value) => `${value.length} cm x ${value.width} cm x ${value.height} cm`
		},
		sex: {
			label: 'Płeć',
			format: (value) => findTitleBySlug(parametersConfig.sex, value)
		},
		weight: {
			label: 'Waga',
			format: (value) => `${value} kg`
		}
	};


	return(
		<div className={styles.parameters}>
			<ul className={styles.parameters_list}>
				{Object.keys(parameterConfig).map((key) => {
					if (singleData.parameter[key] !== undefined) {
						const { label, format } = parameterConfig[key];
						const value = singleData.parameter[key];
						return (
							<li key={key} className={styles.parameters_item}>
								<p className={styles.parameters_label}>{label}:</p> <span className={styles.parameters_format}>{format(value)}</span>
							</li>
						);
					}
					return null;
				})}
			</ul>
		</div>
	)
}

export default Parameters;