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
    id:string,
    ingredientId:string;
    name: string;
    amount:number;
    price:number;
    priceForUnit:number;
}

export interface DishAddIngredientModel{
  dishId:string;
  ingredientId:string;
  amout:number;
}

export interface DishIngredientModel{
  dishId:string;
  ingredientId:string;
}
