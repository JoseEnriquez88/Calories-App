import { StyleSheet, View } from "react-native";
import Home from "./src/views/Home/Home";
import Routes from "./src/routes/Routes";

const App = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Routes />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
