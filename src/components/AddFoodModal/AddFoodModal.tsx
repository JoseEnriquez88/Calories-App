import { FC } from "react";
import { Modal, View, StyleSheet } from "react-native";
import { Button, Icon } from "@rneui/themed";
import { AddFoodModalProps } from "../../types";

const AddFoodModal: FC<AddFoodModalProps> = ({ onClose, visible }) => {
  return (
    <Modal visible={visible} onRequestClose={onClose} transparent>
      <View style={styles.container}>
        <View style={styles.content}>
          <Button icon={<Icon name="close" />} />
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
  },
  content: {
    width: "75%",
  },
});

export default AddFoodModal;
