import DeliveryAddress from "./delivery-address/DeliveryAddress";
import BillingDetails from "./billing-details/BillingDetails";
import Loader from "../../parts/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
	deliveryStatus as reduxDeliveryStatus,
	fetchGetDelivery
} from "../../../redux/slices/deliverySlice";
import {
	billingStatus as reduxBillingStatus,
	fetchGetBilling, fetchGetBillings
} from "../../../redux/slices/billingSlice";

const Profile = () => {
	const deliveryStatus = useSelector(reduxDeliveryStatus);
	const billingStatus = useSelector(reduxBillingStatus);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchGetDelivery());
		dispatch(fetchGetBilling());
		dispatch(fetchGetBillings());
	}, [dispatch]);

	return (
		<div>
			{deliveryStatus === 'fulfilled' && <DeliveryAddress />}
			{billingStatus === 'fulfilled' && <BillingDetails />}
			{(billingStatus === 'pending' || deliveryStatus === 'pending') && <Loader />}
		</div>
	);
}

export default Profile;