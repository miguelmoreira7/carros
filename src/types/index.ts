import {MouseEventHandler} from "react"

export interface CustomButtonProps {
    title: string,
    containerStyles?: string,
    handleClick?: MouseEventHandler<HTMLButtonElement>,
    btnType?: "button" | "submit",
    textStyles?: string,
    rightIcon?: string,
    isDisabled?: boolean,
    disabled?: boolean
}

export interface SearchManufacturerProps {
    manufacturer: string;

    setManufacturer(manufacturer: string): void;
}

export type Car = {
    id: string;
    userId: string;
    available: boolean;
    city_mpg: number;
    class: string;
    combination_mpg: number;
    cylinders: number;
    displacement: number;
    drive: string;
    fuel_type: string;
    highway_mpg: number;
    make: string;
    model: string;
    transmission: string;
    year: number;
}

export interface FilterProps {
    manufacturer: string;
    model: string;
    year: string;
    fuel: string;
    limit: string;
}

export interface FuelOptions {
    title: string;
    value: string;
}

export interface CustomnFilterProps {
    title: string;
    options: FuelOptions[];
}

export interface StyledComponentsProps {
    signinIn: boolean;
}

export interface User {
    nome: string;
    telefone: string;
    rua: string;
    numero: string;
    email: string;
    password: string;
}

export interface LoginRequest {
    login: string;
    password: string;
}
