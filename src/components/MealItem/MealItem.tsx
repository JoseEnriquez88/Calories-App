import { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Icon } from "@rneui/themed";
import { Meal } from "../../types";
import useFoodStorage from "../../hooks/useFoodStorage";
import { MealItemProps } from "../../types";

const MealItem: FC<MealItemProps> = ({
  calories,
  name,
  portion,
  isAbleToAdd,
  itemPosition,
  onCompleteAddRemove,
}) => {
  const { onSaveTodaysFood, onDeleteTodaysFood } = useFoodStorage();

  const handleIconPress = async () => {
    try {
      if (isAbleToAdd) {
        await onSaveTodaysFood({ calories, name, portion });
        alert("Food added to the day.");
      } else {
        await onDeleteTodaysFood(itemPosition ?? -1);
        alert("Food was deleted succesfully!");
      }
      onCompleteAddRemove?.();
    } catch (error) {
      console.error(error);
      alert("Food was not added to the day");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.portion}>{portion}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Button
          icon={<Icon name={isAbleToAdd ? "add-circle-outline" : "close"} />}
          type="clear"
          style={styles.iconButton}
          onPress={handleIconPress}
        />
        <Text style={styles.calories}>{calories} cal</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ade8af",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    flexDirection: "row",
  },
  leftContainer: {
    flex: 1,
    justifyContent: "center",
  },
  rightContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  name: {
    fontSize: 18,
    fontWeight: "500",
  },
  portion: {
    fontSize: 13,
    color: "#808080",
    fontWeight: "500",
  },
  iconButton: {
    marginBottom: -8,
  },
  calories: {
    fontSize: 18,
  },
});

export default MealItem;
