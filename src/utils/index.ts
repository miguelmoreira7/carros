import { Car, FilterProps, LoginRequest, User } from "../types";
import { apiKey, carImageApiKey } from "./apikey";

export const fetchCars = async (searchParams: URLSearchParams) => {
	/* const {manufacturer, model, year, fuel, limit} = filters; */
    const headers = {
		'X-RapidAPI-Key': `${apiKey}`,
		'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
	}
	const response = await fetch(
		`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${searchParams.get('manufacturer') || ''}
		&year=${searchParams.get('Year') || '2022'}
		&model=${searchParams.get('model') || ''}
		&fuel_type=${searchParams.get('Fuel') || ''}`, {
		headers: headers,
	});
	
	const result = await response.json();
	return result
	
}

export const calculateCarRent = (city_mpg: number, year: number) => {
	const basePricePerDay = 100;
	const mileageFactor = 0.1;
	const ageFactor = 0.05;

	const mileageRate = city_mpg * mileageFactor;
	const ageRate = (new Date().getFullYear() - year) * ageFactor;

	const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

	return rentalRatePerDay.toFixed(0);
}

export const generateImageUrl = (car: Car, angle? : string) => {
	const url = new URL('https://cdn.imagin.studio/getimage');

	const {make, model, year} = car;

	url.searchParams.append('customer', `${carImageApiKey}`);
	url.searchParams.append('make', make);
	url.searchParams.append('modelFamily', model.split(' ')[0]);
	url.searchParams.append('zoomType', 'fullscreen');
	url.searchParams.append('modelYear', `${year}`);
	url.searchParams.append('angle', `${angle}`);

	return `${url}`;
}

const port = "26.25.146.180:3051";

export const register = async (userInfo: User) => {
	console.log(JSON.stringify(userInfo));
    try {
        const response = await fetch(`http://${port}/api1/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfo),
        });
		console.log("a");
        const data = await response.json();
        console.log('Resposta do servidor:', data);
        if (!response.ok) {
            throw new Error(`Erro ao registrar: ${data.message || response.statusText}`);
        }
        return data;
    } catch (error) {
        console.error('Erro na requisição:', error);
        throw error;
    }
};

export const login = async (loginData: LoginRequest) => {
    try {
        const response = await fetch(`http://${port}/api1/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        const data = await response.json();
        console.log('Resposta do servidor:', data);

        if (!response.ok) {
            throw new Error(`Erro ao fazer login: ${data.message || response.statusText}`);
        }

        return data;
    } catch (error) {
        console.error('Erro na requisição:', error);
        throw error;
    }
};

