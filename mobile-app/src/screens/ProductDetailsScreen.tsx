import React, { useEffect, useState } from "react";
import { View, Text, Image, Button } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation";
import { api } from "../lib/api";

type Props = NativeStackScreenProps<RootStackParamList, "ProductDetails">;

interface Product {
  id: string;
  name: string;
  price: string;
  description?: string;
  imageUrl?: string;
}

const ProductDetailsScreen: React.FC<Props> = ({ route }) => {
  const { id } = route.params;
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const load = async () => {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data.data);
    };
    load();
  }, [id]);

  if (!product) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {product.imageUrl && (
        <Image
          source={{ uri: product.imageUrl }}
          style={{ width: "100%", height: 240, marginBottom: 16 }}
        />
      )}
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>{product.name}</Text>
      <Text style={{ marginVertical: 8 }}>${product.price}</Text>
      <Text>{product.description}</Text>
      <View style={{ marginTop: 16 }}>
        <Button title="Add to cart (mock)" onPress={() => {}} />
      </View>
    </View>
  );
};

export default ProductDetailsScreen;

