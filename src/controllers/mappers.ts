import { Plant } from './type';
import { TrefleSpeciesResponse, TrefleSpeciesSearchResponse, PlantIdentifier } from './trefle/type';
import { PlantIdDetailsResponse } from './plant_id/type';

export function convertToPlant(trefleData: TrefleSpeciesResponse): Plant {
	const plant: Plant = {
		name: trefleData.data.common_name,
		scientific_name: trefleData.data.scientific_name,
		commons_names: [],
		taxonomy: {
			kingdom: '',
			phylum: '',
			class: '',
			order: '',
			family: trefleData.data.family,
			genus: '',
		},
		description: '',
		edible_parts: [],
		average_height: trefleData.data.specifications?.average_height?.cm || 0,
		maximum_height: trefleData.data.specifications?.maximum_height?.cm || 0,
		toxicity: trefleData.data.specifications?.toxicity || 'none',
		days_to_harvest: trefleData.data.growth?.days_to_harvest || 0,
		maximum_ph: trefleData.data.growth?.ph_maximum || 0,
		minimum_ph: trefleData.data.growth?.ph_minimum || 0,
		minimum_light: trefleData.data.growth?.light || 0,
		maximum_light: trefleData.data.growth?.light || 0,
		minimum_humidity: trefleData.data.growth?.atmospheric_humidity || 0,
		maximum_humidity: trefleData.data.growth?.atmospheric_humidity || 0,
		minimum_temperature: trefleData.data.growth?.minimum_temperature?.deg_c || 0,
		propagation_methods: [],
		maximum_temperature: trefleData.data.growth?.maximum_temperature?.deg_c || 0,
		minimum_soil_humidity: trefleData.data.growth?.soil_humidity || 0,
		maximum_soil_humidity: trefleData.data.growth?.soil_humidity || 0,
		minimum_nutriments: trefleData.data.growth?.soil_nutriments || 0,
		maximum_nutriments: trefleData.data.growth?.soil_nutriments || 0,
	};

	return plant;
}

export function convertToPlantIdentifier(
	trefleObject: TrefleSpeciesSearchResponse
): PlantIdentifier[] {
	return trefleObject.data.map((trefleObject) => ({
		id: trefleObject.id || 0,
		name: trefleObject.scientific_name || '',
	}));
}

export function mergePlantDetails(plant: Plant, detailsResponse: PlantIdDetailsResponse): Plant {
	const mergedPlant: Plant = {
		...plant,
		name: detailsResponse.name || plant.name,
		commons_names: detailsResponse.commons_names,
		taxonomy: {
			...plant.taxonomy,
			kingdom: detailsResponse.taxonomy.kingdom || plant.taxonomy.kingdom,
			phylum: detailsResponse.taxonomy.phylum || plant.taxonomy.phylum,
			class: detailsResponse.taxonomy.class || plant.taxonomy.class,
			order: detailsResponse.taxonomy.order || plant.taxonomy.order,
			family: detailsResponse.taxonomy.family || plant.taxonomy.family,
			genus: detailsResponse.taxonomy.genus || plant.taxonomy.genus,
		},
		description: detailsResponse.description.value || plant.description,
		edible_parts: detailsResponse.edible_parts || plant.edible_parts || [],
		propagation_methods: detailsResponse.propagation_methods || plant.propagation_methods || [],
		average_height: plant.average_height || 30,
		maximum_height: plant.maximum_height || 100,
		days_to_harvest: plant.days_to_harvest || 90,
		minimum_ph: plant.minimum_ph || 6.0,
		maximum_ph: plant.maximum_ph || 7.0,
		minimum_light: plant.minimum_light || 1000,
		maximum_light: plant.maximum_light || 5000,
		minimum_humidity: plant.minimum_humidity || 25,
		maximum_humidity: plant.maximum_humidity || 75,
		minimum_temperature: plant.minimum_temperature || 15,
		maximum_temperature: plant.maximum_temperature || 25,
		minimum_soil_humidity: plant.minimum_soil_humidity || 15,
		maximum_soil_humidity: plant.maximum_soil_humidity || 45,
		minimum_nutriments: plant.minimum_nutriments || 0.5,
		maximum_nutriments: plant.minimum_nutriments || 1.5,
	};

	return mergedPlant;
}
