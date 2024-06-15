import InpostWidget from "../../helpers/InpostWidget";
import orderStyles from '../../order.module.scss'
import styles from './delivery.module.scss'
import {useFormikContext} from "formik";
const Delivery = () => {
	const { values, setFieldValue } = useFormikContext();
	const handleChange = (e) => {
		setFieldValue(e.target.name, e.target.value);
	};

	const editInpostData = () => {
		setFieldValue('deliveryDataInpost.address.line1', '')
		setFieldValue('deliveryDataInpost.address.line2', '')
		setFieldValue('deliveryDataInpost.parcelLockerID', '')
	}

	return(
		<div className={styles.delivery}>
			<div className={styles.list_wrapper}>
				<label className={`${styles.list_label} ${values.deliveryType === 'courier' ? styles.active : ''}`}>
					<div className={styles.list_label_left}>
						<input  type="radio" name="deliveryType" value="courier" checked={values.deliveryType === 'courier'} onChange={handleChange} />
						<span>Kurier</span>
					</div>
					<div className={styles.list_label_right}>
						19,99 zł
					</div>
				</label>
				<label className={`${styles.list_label} ${values.deliveryType === 'inpost' ? styles.active : ''}`}>
					<div style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
						<div className={styles.list_label_left}>
							<input type="radio" name="deliveryType" value="inpost" checked={values.deliveryType === 'inpost'} onChange={handleChange}/>
							<span>InPost Paczkomat 24/7</span>
						</div>
						<div>
							15,99 zł
						</div>
					</div>
					<div className={styles.inpost_data_wrapper}>
						{values.deliveryType === 'inpost' && values.deliveryDataInpost.parcelLockerID.length !== 0 && (
							<div className={styles.inpost_data}>
								<p>
									{values.deliveryDataInpost.address.line1}
								</p>
								<p>
									{values.deliveryDataInpost.address.line2}
								</p>
								<p>
									{values.deliveryDataInpost.parcelLockerID}
								</p>
								<button className={`${styles.edit_button} btn-primary`} onClick={editInpostData}>Edytuj</button>
							</div>
						)}
					</div>
				</label>
			</div>
			{values.deliveryType === 'inpost' && values.deliveryDataInpost.parcelLockerID.length === 0 && <InpostWidget />}


		</div>
	)
}

export default Delivery;