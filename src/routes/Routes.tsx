import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../types/index";

import Home from "../views/Home/Home";
import AddFood from "../views/AddFood/AddFood";
const Stack = createNativeStackNavigator<RootStackParamsList>();

const routeScreenDefaultOptions = {
  headerStyle: {
    backgroundColor: "rgba(7,16,93,255)",
  },
  headerTitleStyle: {
    color: "#ececec",
  },
};

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddFood" component={AddFood} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
