// Product images imported as ES6 modules for proper bundling
import sonaMasoorRice from "@/assets/sona-masoori-rice.jpg";
import basmatiRice from "@/assets/basmati-rice.jpg";
import turmeric from "@/assets/turmeric.jpg";
import blackPepper from "@/assets/black-pepper.jpg";
import greenCardamom from "@/assets/green-cardamom.jpg";
import coffeeBean from "@/assets/coffee-bean.jpg";
import tea from "@/assets/tea.jpg";
import sugar from "@/assets/sugar.jpg";
import wheatFlour from "@/assets/wheat-flour.jpg";
import coconutOil from "@/assets/coconut-oil.jpg";

// Map product image URLs to imported images
export const productImageMap: Record<string, string> = {
  "/src/assets/sona-masoori-rice.jpg": sonaMasoorRice,
  "/src/assets/basmati-rice.jpg": basmatiRice,
  "/src/assets/turmeric.jpg": turmeric,
  "/src/assets/black-pepper.jpg": blackPepper,
  "/src/assets/green-cardamom.jpg": greenCardamom,
  "/src/assets/coffee-bean.jpg": coffeeBean,
  "/src/assets/tea.jpg": tea,
  "/src/assets/sugar.jpg": sugar,
  "/src/assets/wheat-flour.jpg": wheatFlour,
  "/src/assets/coconut-oil.jpg": coconutOil,
};

// Helper function to get the correct image URL
export const getProductImage = (imageUrl: string): string => {
  return productImageMap[imageUrl] || imageUrl;
};
