export interface TranslationResponse {
	data: Data;
}

interface Data {
	translations: Translations[];
}

export interface Translations {
	translatedText: string;
}
