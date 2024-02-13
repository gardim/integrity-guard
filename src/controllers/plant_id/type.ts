/* eslint-disable no-mixed-spaces-and-tabs */
interface SimilarImage {
	id: string;
	url: string;
	license_name: string | null;
	license_url: string | null;
	citation: string | null;
	similarity: number;
	url_small: string;
}

export type ImageType = {
	id: string;
	uri: string;
};

interface Details {
	language: string;
	entity_id: string;
}

interface Suggestion {
	id: string;
	name: string;
	probability: number;
	similar_images: SimilarImage[];
	details: Details;
}

interface IsPlant {
	probability: number;
	threshold: number;
	binary: boolean;
}

interface Classification {
	suggestions: Suggestion[];
}

interface Result {
	is_plant: IsPlant;
	classification: Classification;
}

interface Input {
	latitude: number;
	longitude: number;
	similar_images: boolean;
	images: string[];
	datetime: string;
}

export interface PlantIDResponse {
	access_token: string;
	model_version: string;
	custom_id: null | string;
	input: Input;
	result: Result;
	status: string;
	sla_compliant_client: boolean;
	sla_compliant_system: boolean;
	created: number;
	completed: number;
}

export interface PlantIdentifier {
	name: string;
	probability: number;
}

export interface PlantIdPlantsResponse {
	entities: Entities[];
	entities_trimmed: boolean;
	limit: number;
}

interface Entities {
	matched_in: string;
	matched_in_type: string;
	access_token: string;
	match_position: number;
	match_length: number;
	entity_name: string;
}

export interface PlantIdDetailsResponse {
	commons_names: string[];
	taxonomy: Taxonomy;
	url: string;
	gbif_id: number;
	inaturalist_id: number;
	rank: string;
	description: Description;
	synonyms: string[];
	image: Image | null;
	edible_parts:
		| (
				| 'bulb'
				| 'flowers'
				| 'frond'
				| 'fruit'
				| 'gum'
				| 'leaves'
				| 'lichen'
				| 'mushroom'
				| 'nectar'
				| 'nuts'
				| 'seaweed'
				| 'seeds'
				| 'shoots'
				| 'stems'
				| 'tubers'
		  )[]
		| null;
	watering: Watering;
	propagation_methods:
		| ('cuttings' | 'division' | 'grafting' | 'seeds' | 'spores' | 'suckers')[]
		| null;
	language: string;
	entity_id: string;
	name: string;
}

interface Taxonomy {
	kingdom: string;
	phylum: string;
	class: string;
	order: string;
	family: string;
	genus: string;
}

interface Description {
	value: string;
	citation: string;
	license_name: string;
	license_url: string;
}

interface Image {
	value: string;
	citation: string;
	license_name: string;
	license_url: string;
}

interface Watering {
	min: number;
	max: number;
}
