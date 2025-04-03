import React, { useState } from 'react'
import RecipeSearch from './RecipeSearch';

const RecipeFinder = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { recipes, loading } = RecipeSearch(searchTerm);


  return (
    <div>
        <input
         value={searchTerm}
         onChange={(e) => setSearchTerm(e.target.value)}
         placeholder='Search recipes'
         />

         {loading && <p>Loading...</p>}

         <div className='reipes'>
            {recipes.map(({ recipe }, index) => (
                <div key={index} className='recipe-card'>
                    <h3>{recipe.label}</h3>
                    <img src={recipe.img} alt={recipe.label} />
                    <p>Calorie: {Math.round(recipe.claories)}</p>
                </div>
            ))}
         </div>
    </div>
  )
}

export default RecipeFinder