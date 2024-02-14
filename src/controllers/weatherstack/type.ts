interface Request {
	type: string;
	query: string;
	language: string;
	unit: string;
}

interface Location {
	name: string;
	country: string;
	region: string;
	lat: string;
	lon: string;
	timezone_id: string;
	localtime: string;
	localtime_epoch: number;
	utc_offset: string;
}

interface CurrentInfo {
	observation_time: string;
	temperature: number;
	weather_code: number;
	weather_icons: string[];
	weather_descriptions: string[];
	wind_speed: number;
	wind_degree: number;
	wind_dir: string;
	pressure: number;
	precip: number;
	humidity: number;
	cloudcover: number;
	feelslike: number;
	uv_index: number;
	visibility: number;
	is_day: string;
}

export interface WeatherstackResponse {
	request: Request;
	location: Location;
	current: CurrentInfo;
}

export interface PlantCareInfo {
	temperature: number;
	humidity: number;
	wind_speed: number;
	pressure: number;
	precipitation: number;
	uv_index: number;
	is_day: string;
}
