import React, {useState} from 'react';
import PopupContext from "../contexts/PopupContext";
import Popup from "../popup/Popup";

export function PopupProvider({children}) {

	const [popupContent, setPopupContent] = useState(null);

	const showPopup = (Component, props = {}) => {
		setPopupContent(<Popup>{<Component {...props} />}</Popup>);
	};

	const hidePopup = () => {
		setPopupContent(null);
	};

	return (
		<PopupContext.Provider value={{ popupContent, showPopup, hidePopup }}>
			{children}
		</PopupContext.Provider>
	);
}
