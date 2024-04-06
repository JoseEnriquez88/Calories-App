import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, ScrollView } from "react-native";
import { Button, Icon, Input } from "@rneui/themed";
import { Meal } from "../../types";
import Header from "../../components/Header/Header";
import AddFoodModal from "../../components/AddFoodModal/AddFoodModal";
import useFoodStorage from "../../hooks/useFoodStorage";
import MealItem from "../../components/MealItem/MealItem";

const AddFood = () => {
  const [visible, setIsVisible] = useState<boolean>(false);
  const [foods, setFoods] = useState<Meal[]>([]);
  const [search, setSearch] = useState<string>("");
  const { onGetFoods } = useFoodStorage();

  const loadFoods = async () => {
    try {
      const foodsResponse = await onGetFoods();
      setFoods(foodsResponse);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadFoods().catch(null);
  }, []);

  const handleModalClose = async (shouldUpdate?: boolean) => {
    if (shouldUpdate) {
      Alert.alert("Food saved succesfully");
      await loadFoods();
    }
    setIsVisible(false);
  };

  const handleSearchPress = async () => {
    try {
      const result = await onGetFoods();
      setFoods(
        result.filter((item: Meal) =>
          item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
      );
    } catch (error) {
      console.error(error);
      setFoods([]);
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.addFoodContainer}>
        <View style={styles.legendContainer}>
          <Text style={styles.addFoodLegend}>Add Food</Text>
        </View>
        <View style={styles.addFoodButtonContainer}>
          <Button
            icon={<Icon name="add-circle-outline" color="#ececec" />}
            radius="lg"
            color="#4ecb71"
            onPress={() => setIsVisible(true)}
          />
        </View>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          <Input
            placeholder="apples, fries, soda"
            value={search}
            onChangeText={(text: string) => setSearch(text)}
          />
        </View>
        <Button
          title="Search"
          color="#ade8af"
          titleStyle={styles.searchButtonTitle}
          radius="lg"
          onPress={handleSearchPress}
        />
      </View>
      <ScrollView style={styles.content}>
        {foods?.map((meal) => (
          <MealItem key={`my-meal-item-${meal.name}`} {...meal} isAbleToAdd/>
        ))}
      </ScrollView>
      <AddFoodModal visible={visible} onClose={handleModalClose} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "#ececec",
  },
  addFoodContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  legendContainer: {
    flex: 1,
  },
  addFoodLegend: {
    fontSize: 20,
  },
  addFoodButtonContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  inputContainer: {
    flex: 1,
    marginLeft: -12,
  },
  searchContainer: {
    flexDirection: "row",
  },
  searchButtonTitle: {
    color: "#000",
    fontSize: 14,
  },
  content: {},
});

export default AddFood;
