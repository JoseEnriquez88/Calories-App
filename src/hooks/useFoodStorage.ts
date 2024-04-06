import AsyncStorage from "@react-native-async-storage/async-storage";
import { isToday } from "date-fns";
import { Meal } from "../types";

const MY_FOOD_KEY = "@MyFood:Key";
const MY_TODAY_FOOD_KEY = "@MyTodayFood:Key";

const useFoodStorage = () => {
  const saveInfoToStorage = async (storageKey: string, meal: Meal) => {
    try {
      const currentSavedFood = await AsyncStorage.getItem(storageKey);
      if (currentSavedFood !== null) {
        const currentSavedFoodParsed = JSON.parse(currentSavedFood);
        currentSavedFoodParsed.push(meal);
        await AsyncStorage.setItem(
          storageKey,
          JSON.stringify(currentSavedFoodParsed)
        );
        return Promise.resolve();
      }
      await AsyncStorage.setItem(storageKey, JSON.stringify([meal]));
      return Promise.resolve();
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };

  const handleSaveFood = async ({ calories, name, portion }: Meal) => {
    try {
      const result = await saveInfoToStorage(MY_FOOD_KEY, {
        calories,
        name,
        portion,
      });
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleGetFoods = async () => {
    try {
      const foods = await AsyncStorage.getItem(MY_FOOD_KEY);
      if (foods !== null) {
        const parsedFoods = JSON.parse(foods);
        return Promise.resolve(parsedFoods);
      }
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };

  const handleSaveTodaysFood = async ({ calories, name, portion }: Meal) => {
    try {
      const result = await saveInfoToStorage(MY_TODAY_FOOD_KEY, {
        calories,
        name,
        portion,
        date: new Date().toISOString(),
      });
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleGetTodaysFood = async () => {
    try {
      const foods = await AsyncStorage.getItem(MY_TODAY_FOOD_KEY);
      if (foods !== null) {
        const parsedFood = JSON.parse(foods) as Meal[];
        return Promise.resolve(
          parsedFood.filter((meal) => meal.date && isToday(meal.date))
        );
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleRemoveTodaysFood = async (index: number) => {
    try {
      const todaysFood = await handleGetTodaysFood();
      const filteredItem = todaysFood?.filter((item: Meal, itemIndex) => {
        return itemIndex !== index;
      });
      await AsyncStorage.setItem(
        MY_TODAY_FOOD_KEY,
        JSON.stringify(filteredItem)
      );
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    onSaveFood: handleSaveFood,
    onGetFoods: handleGetFoods,
    onSaveTodaysFood: handleSaveTodaysFood,
    onGetTodaysFood: handleGetTodaysFood,
    onDeleteTodaysFood: handleRemoveTodaysFood,
  };
};

export default useFoodStorage;
