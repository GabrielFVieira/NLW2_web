export const passwordPattern = {
	// pattern: String.raw`(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}`,
	// title: "A senha deve conter ao menos 8 caractéres, dentre eles ao menos 1 número, 1 caractér maiúsculo e 1 minúsculo."
	pattern: String.raw`(?=.*\d).{8,}`,
	title: 'A senha deve conter ao menos 8 caractéres, dentre eles ao menos 1 número.',
};

export const currencyPattern = {
	pattern: String.raw`^.{2}[-+]?(?:[0-9]+,)*[0-9]+(?:\.[0-9]+)?$`,
	title: 'O valor deve começar com R$ e conter os 2 números após a vírgula.',
};

export const phonePattern = {
	pattern: String.raw`(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3,5})([-\s\.]?[0-9]{3,4})`,
	title: 'O número deve conter o código do país, o DDD e 9 dígitos.',
};
