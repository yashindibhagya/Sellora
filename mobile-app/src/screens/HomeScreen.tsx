import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation";
import { api } from "../lib/api";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

interface Product {
  id: string;
  name: string;
  price: string;
  imageUrl?: string;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get("/products");
      setProducts(res.data.data.items);
    };
    fetchData();
  }, []);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("ProductDetails", { id: item.id })}
            style={{ marginBottom: 16, flexDirection: "row" }}
          >
            {item.imageUrl && (
              <Image
                source={{ uri: item.imageUrl }}
                style={{ width: 80, height: 80, marginRight: 12 }}
              />
            )}
            <View>
              <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
              <Text>${item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HomeScreen;

