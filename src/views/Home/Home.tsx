import { useCallback, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Icon } from "@rneui/themed";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Meal, RootStackParamsList } from "../../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Header from "../../components/Header/Header";
import useFoodStorage from "../../hooks/useFoodStorage";
import TodaysCalories from "../../components/TodaysCalories/TodaysCalories";
import TodaysMeals from "../../components/TodaysMeals/TodaysMeals";
import { TodaysCaloriesProps } from "../../types";

const totalCaloriesPerDay: number = 2000;

const Home = () => {
  const [todaysFood, setTodaysFood] = useState<Meal[]>([]);
  const [todaysStatistics, setTodaysStatistics] =
    useState<TodaysCaloriesProps>();
  const { onGetTodaysFood } = useFoodStorage();
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamsList, "Home">>();

  const calculatedTodaysStatistics = (meals: Meal[] | undefined) => {
    try {
      if (meals) {
        const caloriesConsumed = meals.reduce(
          (acum, curr) => acum + Number(curr.calories),
          0
        );
        const remainingCalories = totalCaloriesPerDay - caloriesConsumed;
        const percentage = (caloriesConsumed / totalCaloriesPerDay) * 10;
        setTodaysStatistics({
          consumed: caloriesConsumed,
          percentage,
          remaining: remainingCalories,
          total: totalCaloriesPerDay,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loadTodaysFood = useCallback(async () => {
    try {
      const todaysFoodResponse = (await onGetTodaysFood()) as Meal[];
      calculatedTodaysStatistics(todaysFoodResponse);
      setTodaysFood(todaysFoodResponse);
    } catch (error) {
      setTodaysFood([]);
      console.error(error);
    }
    //eslint-disable-net-line react-hooks/exhaustive-deps
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTodaysFood().catch(null);
    }, [loadTodaysFood])
  );

  const handleAddCaloriesPress = () => {
    navigate("AddFood");
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.caloriesContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.caloriesLegend}>Calories</Text>
        </View>
        <View style={styles.rightContainer}>
          <Button
            icon={<Icon name="add-circle-outline" color="#ececec" />}
            radius="lg"
            color="#4ecb71"
            onPress={handleAddCaloriesPress}
          />
        </View>
      </View>
      <TodaysCalories {...todaysStatistics} />
      <TodaysMeals
        foods={todaysFood}
        onCompleteAddRemove={() => loadTodaysFood()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: "#ececec",
    flex: 1,
  },
  caloriesContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  leftContainer: {
    flex: 1,
    justifyContent: "center",
  },
  caloriesLegend: {
    fontSize: 20,
  },
  rightContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
});

export default Home;
