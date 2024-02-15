import swaggerAutogen from 'swagger-autogen';
import { WeatherstackResponse, PlantCareInfo } from './src/controllers/weatherstack/type';

const doc = {
	info: {
		version: 'v1.0.0',
		title: 'Integrity Guard',
		contact: {
			name: 'Gardim',
			url: 'https://github.com/gardim',
		},
	},
	externalDocs: {
		description: 'Requisition documentation',
		url: 'https://gardim.notion.site/Anti-Corruption-Layer-0923259343894219af61dc044273f8cd',
	},
	components: {
		securitySchemes: {
			bearerAuth: {
				type: 'http',
				scheme: 'bearer',
			},
		},
		schemas: {
			PlantInformationResponse: {
				name: 'Monstera deliciosa',
				scientific_name: 'Monstera deliciosa',
				taxonomy: {
					kingdom: 'Plantae',
					phylum: 'Tracheophyta',
					class: 'Liliopsida',
					order: 'Alismatales',
					family: 'Araceae',
					genus: 'Monstera',
				},
				description:
					'Monstera deliciosa, the Swiss cheese plant or split-leaf philodendron is a species of flowering plant native to tropical forests of southern Mexico, south to Panama. It has been introduced to many tropical areas, and has become a mildly invasive species in Hawaii, Seychelles, Ascension Island and the Society Islands. It is very widely grown in temperate zones as a houseplant.\nThe common name "Swiss cheese plant" is also used for the related species from the same genus, Monstera adansonii. The common name "split-leaf philodendron" is also used for the species Thaumatophyllum bipinnatifidum, although neither species are in the genus Philodendron.',
				edible_parts: ['fruit'],
				average_height: 30,
				maximum_height: 100,
				toxicity: 'none',
				days_to_harvest: 90,
				maximum_ph: 7,
				minimum_ph: 6,
				minimum_light: 1000,
				maximum_light: 5000,
				minimum_humidity: 25,
				maximum_humidity: 75,
				minimum_temperature: 15,
				propagation_methods: ['cuttings', 'seeds'],
				maximum_temperature: 25,
				minimum_soil_humidity: 15,
				maximum_soil_humidity: 45,
				minimum_nutriments: 0.5,
				maximum_nutriments: 1.5,
			},
			PlantSearchTextResponse: {
				id: 227070,
				name: 'Cynodon dactylon',
			},
			PlantSearchImageRequest: {
				images: [
					{
						uri: 'https://media.istockphoto.com/id/961167782/pt/foto/monstera-leaves-on-white-background-tropical-botanical-nature-concepts-ideas-flat-lay-clipping.jpg?s=612x612&w=0&k=20&c=s3Tl1vGjbx7Mqg3aXH4IBWdLwpJ3IsxaU5gortO5Kq4=',
					},
					{
						uri: 'https://media.istockphoto.com/id/972170674/pt/foto/monstera-plant-leaves-the-tropical-evergreen-vine-isolated-on-white-background-clipping-path.jpg?s=612x612&w=0&k=20&c=tgGnGv0oK7OYpUrKrSF8c4zIyFrhOAiaPofbv-ek7lE=',
					},
				],
				latitude: 85.45,
				longitude: -67.89,
				similar_images: true,
			},
			PlantSearchImageResponse: {
				"data": [
					{
						"name": "Monstera deliciosa",
						"probability": 0.4058
					},
					{
						"name": "Heptapleurum",
						"probability": 0.2049
					},
					{
						"name": "Aconitum delphiniifolium",
						"probability": 0.165
					},
					{
						"name": "Lupinus shockleyi",
						"probability": 0.0447
					},
					{
						"name": "Cardamine polemonioides",
						"probability": 0.0336
					},
					{
						"name": "Fatsia",
						"probability": 0.033
					},
					{
						"name": "Viola",
						"probability": 0.0324
					},
					{
						"name": "Betula nana",
						"probability": 0.0323
					},
					{
						"name": "Geranium",
						"probability": 0.0271
					},
					{
						"name": "Lupinus arcticus",
						"probability": 0.0212
					}
				]
			},
			WeatherResponse: {
				temperature: 28,
				humidity: 55,
				wind_speed: 17,
				pressure: 1023,
				precipitation: 0.5,
				uv_index: 9,
				is_day: 'yes',
			},
			WeatherRequest: {
				query: 'Juiz de Fora',
			},
			TranslateRequest: {
				q: 'Hello World',
				source: 'en',
				target: 'pt',
			},
			TranslateResponse: {
				"data": [
					{
						"translatedText": "Olá Mundo"
					}
				]
			}
		},
	},
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/routes/index.ts'];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);
