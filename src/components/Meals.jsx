import { useEffect } from 'react';
import { useState } from 'react';
import { fetchMeals } from '../util/http';
import MealItem from './MealItem';

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
        {loadedMeals.map((meal) => (
          <MealItem key={meal.id} {...meal} />
        ))}
      </ul>
    );
  }

  return content;
}

export default Meals;
