import { useEffect, useState } from "react";
import "./App.css";
import Recipe from "./Recipe";

function App() {
  const edamamConfig = {
    apiID: process.env.REACT_APP_EDAMAM_APP_ID,
    apiKey: process.env.REACT_APP_EDAMAM_API_KEY,
  };

  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("banana");
  const [recipes, setRecipes] = useState([]);

  const getRecipes = async () => {
    const response = await fetch(
      'https://api.edamam.com/search?q="' +
        query +
        '"&app_id=' +
        edamamConfig.apiID +
        "&app_key=" +
        edamamConfig.apiKey
    );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    getRecipes();
  }, [query]);

  return (
    <div className="App">
      <form onSubmit={getSearch}>
        <input type="text" value={search} onChange={updateSearch} />
        <button type="submit">検索</button>
      </form>
      <div>
        {recipes.map((recipe) => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
