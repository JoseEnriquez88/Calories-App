import { FC, useState } from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import { Button, Icon, Input } from "@rneui/themed";
import { AddFoodModalProps } from "../../types";

const AddFoodForm: FC<AddFoodModalProps> = () => {
  const [calories, setCalories] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [piece, setPiece] = useState<string>("");

  return (
    <View>
      <View style={styles.formItem}>
        <View style={styles.inputContainer}>
          <Input
            value={calories}
            onChangeText={(text: string) => setCalories(text)}
          />
        </View>
        <View style={styles.legendContainer}>
          <Text style={styles.legend}>KCAL</Text>
        </View>
      </View>
      <View style={styles.formItem}>
        <View style={styles.inputContainer}>
          <Input value={name} onChangeText={(text: string) => setName(text)} />
        </View>
        <View style={styles.legendContainer}>
          <Text style={styles.legend}>Name</Text>
        </View>
      </View>
      <View style={styles.formItem}>
        <View style={styles.inputContainer}>
          <Input
            value={piece}
            onChangeText={(text: string) => setPiece(text)}
          />
        </View>
        <View style={styles.legendContainer}>
          <Text style={styles.legend}>Piece</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Add"
          icon={<Icon name="add" color="#ececec" />}
          radius="lg"
          color="#4ecb71"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputContainer: {
    flex: 2,
  },
  legendContainer: {
    flex: 1,
  },
  legend: {
    fontWeight: "500",
  },
  buttonContainer: {
    alignItems: "flex-end",
  },
});

export default AddFoodForm;
