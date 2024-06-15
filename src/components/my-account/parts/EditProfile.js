import styles from './edit-profile.module.scss';
import { useState, useRef, useEffect } from "react";

const EditProfile = ({ children, sectionTitle, previewSection, editData, deleteData, createData, setActionType }) => {
	const [isVisible, setIsVisible] = useState(false);
	const contentRef = useRef(null);
	console.log(previewSection)
	const changeVisible = () => {
		setIsVisible(prevState => !prevState);
	};

	useEffect(() => {
		if (isVisible) {
			contentRef.current.style.maxHeight = contentRef.current.scrollHeight + "px";
		} else {
			contentRef.current.style.maxHeight = "0px";
		}
	}, [isVisible]);

	const editDataHandle = (id) => {
		setActionType('edit')
		setIsVisible(false)
		setTimeout(() => {
			editData(id)
			setIsVisible(true)
		}, 200)
	}

	const deleteDataHandle = (id) => {
		deleteData(id)
		setIsVisible(false)
	}

	const createDataHandle = () => {
		setActionType('create')
		setIsVisible(false)
		setTimeout(() => {
			createData()
			setIsVisible(true)
		}, 200)
	}

	return (
		<div className={styles.edit_profile}>
			<button className={`${styles.edit_profile_button}`}>
				{sectionTitle}
			</button>
			{previewSection &&
				<div className={styles.edit_profile_preview_section}>
					{previewSection.map((item, index) => (
						<div key={index} className={styles.edit_profile_preview_item}>
							<span className={styles.address_index}>Adres: {index + 1}</span>
							<ul className={styles.item_loop_wrapper}>
								{item.data.map((el, index) => (
									<li className={styles.item_loop_item} key={index}>
										{el.name}: {el.value}
									</li>
								))}
							</ul>
							<div className={styles.edit_profile_preview_actions}>
								<button className={`btn-primary ${styles.action_button}`} onClick={() => editDataHandle(item.id)}>Edytuj</button>
								<button className={`btn-primary ${styles.action_button}`} onClick={() => deleteDataHandle(item.id)}>Usuń</button>
							</div>
						</div>
					))}
					{(previewSection.length < 3) &&
						<button onClick={createDataHandle} className={`btn-outline-secondary ${styles.add_new_data}`}>Dodaj nowy adres</button>
					}
				</div>
			}
			<div ref={contentRef} className={`${styles.edit_profile_content}`}>
				{children}
			</div>
		</div>
	);
};

export default EditProfile;