import { ImageSourcePropType } from "react-native";

interface Category {
  Id: string;
  Name: string;
}

interface Service {
  Id: string;
  Image: string;
  Name: string;
  Description: string;
  Price: number;
  Active: boolean;
  Category: Category;
}
