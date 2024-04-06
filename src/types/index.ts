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

export type TodaysCaloriesProps = {
  total: number | string;
  consumed: number | string;
  remaining: number | string;
  percentage: number;
};

export type TodaysMealProps = {
  foods: Meal[];
  onCompleteAddRemove?: () => void;
};

export type MealItemProps = Meal & {
  isAbleToAdd?: boolean;
  onCompleteAddRemove?: () => void;
  itemPosition?: number;
};
