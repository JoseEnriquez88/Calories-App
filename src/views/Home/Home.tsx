import { View, Text, StyleSheet } from "react-native";
import { Button, Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { RootStackParams } from "../../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Header from "../../components/Header/Header";

const Home = () => {
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParams, "Home">>();

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
