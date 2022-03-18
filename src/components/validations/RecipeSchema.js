import * as yup from 'yup';

const Schema = yup.object().shape({
    recipe_name: yup
        .string()
        .trim()
        .required('Title is required!'),
    recipe_source: yup
        .string()
        .trim()
        .required('Source is required!'),
    recipe_category: yup
        .string()
        .oneOf(['Appetizer', 'Baked Good', 'Dessert', 'Main', 'Salad', 'Side Dish', 'Snack', 'Soup'], 'Category is required!'),
    recipe_ingredients: yup
        .string()
        .trim()
        .required('Ingredients are required'),
    recipe_instructions: yup
        .string()
        .trim()
        .required('Instructions are required'),
})

export default Schema;