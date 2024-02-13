export interface Plant {
	name: string;
	scientific_name: string;
	family: string;
	flower_color: string[];
	average_height: number;
	maximum_height: number;
	toxicity: boolean;
	days_to_harvest: number;
	ph_maximun: number;
	ph_minimum: number;
	light: number;
	humidity: number;
	minimum_temperature: number;
	maximum_temperature: number;
	soil_humidity: number;
	nutriments: number;
}

export interface PlantIdentifier {
	id: number;
	name: string;
}
