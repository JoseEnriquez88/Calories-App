import { FC, useEffect, useState } from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import { Button, Icon, Input } from "@rneui/themed";
import { AddFoodModalProps } from "../../types";
import useFoodStorage from "../../hooks/useFoodStorage";

const AddFoodModal: FC<AddFoodModalProps> = ({ onClose, visible }) => {
  const [calories, setCalories] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [portion, setPortion] = useState<string>("");
  const { onSaveFood } = useFoodStorage();

  useEffect(() => {
    setCalories("");
    setName("");
    setPortion("");
  }, [visible]);

  const handleAddPress = async () => {
    try {
      const response = await onSaveFood({ calories, name, portion });
      onClose(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={() => onClose()}
      transparent
      animationType="fade"
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.closeContainer}>
            <Button
              icon={<Icon name="close" size={28} />}
              onPress={() => onClose()}
              type="clear"
            />
          </View>
          <View style={styles.formItem}>
            <View style={styles.inputContainer}>
              <Input
                value={calories}
                onChangeText={(text: string) => setCalories(text)}
              />
            </View>
            <View style={styles.legendContainer}>
              <Text style={styles.legend}>CAL</Text>
            </View>
          </View>
          <View style={styles.formItem}>
            <View style={styles.inputContainer}>
              <Input
                value={name}
                onChangeText={(text: string) => setName(text)}
              />
            </View>
            <View style={styles.legendContainer}>
              <Text style={styles.legend}>Name</Text>
            </View>
          </View>
          <View style={styles.formItem}>
            <View style={styles.inputContainer}>
              <Input
                value={portion}
                onChangeText={(text: string) => setPortion(text)}
              />
            </View>
            <View style={styles.legendContainer}>
              <Text style={styles.legend}>Portion</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Add"
              icon={<Icon name="add" color="#ececec" />}
              radius="lg"
              color="#4ecb71"
              onPress={handleAddPress}
              disabled={
                calories.trim() === "" ||
                name.trim() === "" ||
                portion.trim() === ""
              }
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  content: {
    width: "90%",
    backgroundColor: "#ececec",
    padding: 18,
    borderRadius: 20,
    shadowColor: "#000",
    elevation: 5,
  },
  closeContainer: {
    alignItems: "flex-end",
  },
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

export default AddFoodModal;
