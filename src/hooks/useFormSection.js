import { useFormikContext } from 'formik';
import React from 'react';
import ValidationError from "../components/parts/validation-error/ValidationError";

const useFormSection = (sectionName) => {
	const { values, errors, handleChange, handleBlur } = useFormikContext();

	const renderInput = (name, label, type='text') => (
		<div className="input-wrapper primary" key={name}>
			<input
				className={`input-typing ${values[sectionName][name]?.length === 0 ? '' : 'has-content'} ${
					values[sectionName][name]?.length === 0 ? '' : (errors[sectionName]?.[name] ? 'no-valid' : 'valid')
				}`}
				type={type}
				onChange={handleChange}
				onBlur={handleBlur}
				name={`${sectionName}.${name}`}
				value={values[sectionName][name] || ""}
			/>
			<label>{label}</label>
			<span className="focus-border"></span>
			<ValidationError isErrorVisible={errors[sectionName]?.[name]} errorMessage={errors[sectionName]?.[name]} />
		</div>
	);

	return { renderInput };
};

export default useFormSection;