import React, { useEffect } from 'react'
import { Card, Container, Form } from 'react-bootstrap';
import { fetchRecipes } from '../hooks/FetchRecipes';

export interface Recipe {
    brand_name: string;
    food_name: string;
    serving_unit: string;
    serving_qty: string;
    nf_calories: string;
    photo: {
        thumb: string;
    },
}


export const RecipesList: React.FC = () => {
    const [recipes, setRecipes] = React.useState<Recipe[]>([]);
    const [query, setQuery] = React.useState<string>('');
    const [error, setError] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState<boolean>(false);

    useEffect(() => {
        const getRecipes = async () => {
            if (query) {
                setLoading(true);
                setError(null);
                try {
                    const data = await fetchRecipes(query);
                    setRecipes(data.common);
                } catch (error) {
                    console.error("Error fetching recipes:", error);
                    setError("Failed to fetch recipes. Please try again.");
                } finally {
                    setLoading(false);
                }
            }
        };
        getRecipes();
    }, [query]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    return (
        <Container className='recipe-container'>
            <h1>Recipes</h1>
            <Form.Group controlId="formQuery">
                <Form.Label>Search for a Recipe</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter to search recipes"
                    value={query}
                    onChange={handleInputChange}
                />
            </Form.Group>

            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}

            {!loading && !error && recipes.length > 0 && (
                        <Card className='recipe-card'>
                            {recipes.map((recipe) => (
                                <Card.Body key={recipe.food_name}>
                                    <Card.Title>{recipe.food_name}</Card.Title>
                                    <Card.Img variant="top" src={recipe.photo.thumb} />
                                    <Card.Text>
                                        {recipe.serving_qty} {recipe.serving_unit}
                                    </Card.Text>
                                    <Card.Text>
                                        Calories: {recipe.nf_calories}
                                    </Card.Text>
                                    <Card.Text>
                                        Brand: {recipe.brand_name}
                                    </Card.Text>
                                </Card.Body>
                            ))}
                        </Card>
                    )}

        </Container>
    );
};
