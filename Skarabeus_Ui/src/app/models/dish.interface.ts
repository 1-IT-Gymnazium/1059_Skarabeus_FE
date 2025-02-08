import { IngredientDetail } from "./ingredient/ingredient-detail.interface";

export interface DishDetail {
    id: string;
    name: string;
    description: number;
    ingredients:IngredientDetail[]|undefined;
}

export interface DishCreate {
    name: string;
    description:string;
}

