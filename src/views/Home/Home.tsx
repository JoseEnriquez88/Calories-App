import { useCallback, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Icon } from "@rneui/themed";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Meal, RootStackParamsList } from "../../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Header from "../../components/Header/Header";
import useFoodStorage from "../../hooks/useFoodStorage";

const Home = () => {
  const [todaysFood, setTodaysFood] = useState<Meal[]>([]);
  const { onGetTodaysFood } = useFoodStorage();
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamsList, "Home">>();

  const loadTodaysFood = useCallback(async () => {
    try {
      const todaysFoodResponse = await onGetTodaysFood();
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
