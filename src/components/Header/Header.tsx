import { useNavigation } from "@react-navigation/native";
import { Button, Icon } from "@rneui/themed";
import { View, Text, Image, StyleSheet } from "react-native";

const staticInfo = {
  name: "Jose Enriquez",
  uri: "https://avatars.githubusercontent.com/u/120431604?s=400&u=04eb3ad8171c2e4e6e0ed9dba39fab7e89ab6366&v=4",
};

const Header = () => {
  const { canGoBack, goBack } = useNavigation();

  return (
    <View style={styles.container}>
      {canGoBack() ? (
        <View style={styles.arrowContainer}>
          <Button
            icon={<Icon name="arrow-back" size={24} />}
            type="clear"
            onPress={() => goBack()}
          />
        </View>
      ) : undefined}
      <View style={styles.leftContainer}>
        <Text style={styles.name}>{`Hello ${staticInfo.name}`}</Text>
        <Text style={styles.subtitle}>Welcome back to your goal.</Text>
      </View>
      <View style={styles.rightContainer}>
        <Image source={{ uri: staticInfo.uri }} style={styles.profileImage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 30,
  },
  leftContainer: {
    flex: 1,
    justifyContent: "center",
  },
  rightContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  name: {
    fontWeight: "bold",
    fontSize: 14,
  },
  subtitle: {
    fontSize: 12,
    color: "#808080",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 24,
  },
  arrowContainer: {
    marginLeft: -12,
  },
});

export default Header;
