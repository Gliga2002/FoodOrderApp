import { useEffect } from 'react';
import { useState } from 'react';
import { fetchMeals } from '../http';

function Meals() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadedMeals, setLoadedMeals] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        // prvo napisi celu funkciju fetchMeals ovde, pa onda vidi da outsource logic
        // tako si radio i na LEETCODE, tako i sa COMPONENTS, i sa fjama in general!!
        // takodje ne treba fetchMeals da stavis u dependency jer je to obicna js funkcija, nece se recreate, nije deo React component, u separate file je
        const data = await fetchMeals();
        setLoadedMeals(data);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    }

    fetchData();
  }, []);

  let content = <p className="center-text">Loading data...</p>;

  if (error) {
    content = <p className="center-text">Loading data...</p>;
  }

  if (!isLoading && !error) {
    content = (
      <ul id="meals">
        {loadedMeals.map((meal) => {
          return (
            <li key={meal.id} className="meal-item">
              <article>
                <img src={`http://localhost:3000/${meal.image}`} alt="img" />
                <div>
                  <h3>{meal.name}</h3>
                  <p className="meal-item-price">{meal.price}</p>
                  <p className="meal-item-description">{meal.description}</p>
                </div>
                <div className="meal-item-actions" F>
                  <button>Remove</button>
                  <button>Add to Cart</button>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    );
  }

  return content;
}

export default Meals;
