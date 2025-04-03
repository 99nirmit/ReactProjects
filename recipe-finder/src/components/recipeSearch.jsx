import React, { useEffect, useState } from 'react'

const RecipeSearch = (query) => {

    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const[error, setError] = useState(null);
    const API_KEY = "a2ca7d6dc3c92d1a12e60633530a69ba";
    const API_ID = "6778cc76";

    useEffect(() => {
        if(!query) return;

        const fetchRecipes = async () => {
            setLoading(true);

            try{
                const response = await fetch(`/api/search?q=${query}&app_id=${API_ID}&app_key=${API_KEY}`);
                const data = response.json();
                setRecipes(data.hits);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(true);
            }
        };

        fetchRecipes();
    }, [query]);

    return { recipes, loading, error};

    

  return (
    <div>RecipeSearch</div>
  )
}

export default RecipeSearch