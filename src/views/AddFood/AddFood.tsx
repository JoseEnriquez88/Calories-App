import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Icon, Input } from "@rneui/themed";
import Header from "../../components/Header/Header";
import AddFoodModal from "../../components/AddFoodModal/AddFoodModal";

const AddFood = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const handleModalClose = () => {
    setVisible(false);
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
          />
        </View>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          <Input placeholder="apples, fries, soda" />
        </View>
        <Button
          title="Search"
          color="#ade8af"
          titleStyle={styles.searchButtonTitle}
          radius="lg"
          onPress={() => setVisible(true)}
        />
      </View>
      <AddFoodModal visible={visible} onClose={handleModalClose} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
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
});

export default AddFood;
