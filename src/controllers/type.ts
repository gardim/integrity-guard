export interface Plant {
	name: string;
	scientific_name: string;
	commons_names: string[];
	taxonomy: Taxonomy;
	description: string;
	edible_parts: string[];
	propagation_methods: string[];
	toxicity: ('none' | 'low' | 'medium' | 'high') | null;
	average_height: number;
	maximum_height: number;
	days_to_harvest: number;
	minimum_ph: number;
	maximum_ph: number;
	minimum_light: number;
	maximum_light: number;
	minimum_humidity: number;
	maximum_humidity: number;
	minimum_temperature: number;
	maximum_temperature: number;
	minimum_soil_humidity: number;
	maximum_soil_humidity: number;
	minimum_nutriments: number;
	maximum_nutriments: number;
}

export interface PlantIdentfier {
	id: number;
}

interface Taxonomy {
	kingdom: string;
	phylum: string;
	class: string;
	order: string;
	family: string;
	genus: string;
}
