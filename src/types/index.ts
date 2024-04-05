export type RootStackParamsList = {
  Home: undefined;
  AddFood: undefined;
};

export type AddFoodModalProps = {
  onClose: (shouldUpdate?: boolean) => void;
  visible: boolean;
};

export type Meal = {
  calories: string;
  name: string;
  portion: string;
  date?: string;
};
