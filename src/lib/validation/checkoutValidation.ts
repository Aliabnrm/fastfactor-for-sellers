export const postalCodePattern = /^\d{10}$/;
export const cardDigitsPattern = /^\d{4}$/;
export const phonePattern = /^0\d{10}$/;

export const isEmpty = (value: string) => !value || value.trim() === "";
