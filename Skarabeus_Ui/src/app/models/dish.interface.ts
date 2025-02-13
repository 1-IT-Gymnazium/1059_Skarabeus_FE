import { IngredientDetail } from "./ingredient/ingredient-detail.interface";

export interface DishDetail {
    id: string;
    name: string;
    description: string;
    ingredients:IngredientDishDetail[]|undefined;
}

export interface DishCreate {
    name: string;
    description:string;
}

export interface IngredientDishDetail {
    ingredientId:string;
    name: string;
    amount:number;
    price:number;

    priceForAmount:number;
}
