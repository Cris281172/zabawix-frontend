import {createContext, useContext} from "react";

const PopupContext = createContext(null);

export const usePopupContext = () => {

	return useContext(PopupContext);

};

export default PopupContext;