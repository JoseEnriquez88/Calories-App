import { FC } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Meal } from "../../types";
import { TodaysMealProps } from "../../types";
import MealItem from "../MealItem/MealItem";

const TodaysMeals: FC<TodaysMealProps> = ({ foods, onCompleteAddRemove }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meals</Text>
      <ScrollView style={styles.content}>
        {foods?.map((meal: Meal, index) => (
          <MealItem
            key={`today-meal-item-${meal.name}-${index}`}
            {...meal}
            onCompleteAddRemove={onCompleteAddRemove}
            itemPosition={index}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
  },
  title: {
    fontSize: 16,
  },
  content: {
    marginVertical: 16,
  },
});

export default TodaysMeals;
