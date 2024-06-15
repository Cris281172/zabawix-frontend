export const postalCodeRegex = /^(\d{2}-?\d{3}|\d{5}|\d{2} \d{3})$/;

export const phoneNumberRegex = /^(\+48)?[\s-]?\d{3}[\s-]?\d{3}[\s-]?\d{3}$/;

export const taxIDRegex = /^\d{10}$/;

export const removeSpaces = (input) => input.replace(/\s+/g, '');