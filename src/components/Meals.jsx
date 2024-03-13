import MealItem from './MealItem';
import useHttp from '../hooks/useHttp';
import Error from './Error';

const requestConfig = {};
// primitive values -> built in into language, defined in ES6
// referency -> build by user
// primitive -> stored as values, can be copy
// reference -> sotred as memory addres, pass pointer
// TODO: everytime when you re-render, it recreates primitive value, which stays the same, and brand new obj, which will create new pointer with same value

function Meals() {
  console.log('<Meals />');
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp('http://localhost:3000/meals', requestConfig, []);

  if (isLoading) return <p className="center">Loading data...</p>;

  if (error) {
    console.log(error);
    return <Error title="Failed to fetch meals" message={error} />;
  }
  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} {...meal} />
      ))}
    </ul>
  );
}

export default Meals;
