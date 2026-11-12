import { useCallback, useState } from "react";
import { View, Image, FlatList, StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import { carregarFavoritos } from "../storage/favoritos";

export default function FavoritosScreen({ navigation }) {
  const [favoritos, setFavoritos] = useState([]);

  useFocusEffect(
    useCallback(() => {
      async function carregar() {
        setFavoritos(await carregarFavoritos());
      }
      carregar();
    }, [])
  );

  if (favoritos.length === 0) {
    return (
      <View style={styles.centro}>
        <Text variant="bodyLarge">Você ainda não favoritou nenhum personagem.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favoritos}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={{ padding: 12 }}
      renderItem={({ item }) => (
        <Card
          style={styles.card}
          onPress={() => navigation.navigate("Detalhes", { personagem: item })}
        >
          <View style={styles.linhaCard}>
            <Image source={{ uri: item.image }} style={styles.foto} />
            <View style={styles.info}>
              <Text variant="titleMedium">{item.name}</Text>
              <Text variant="bodyMedium">Status: {item.status}</Text>
              <Text variant="bodyMedium">Espécie: {item.species}</Text>
            </View>
          </View>
        </Card>
      )}
    />
  );
}

const styles = StyleSheet.create({
  centro: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  card: { marginBottom: 12, overflow: "hidden" },
  linhaCard: { flexDirection: "row" },
  foto: { width: 90, height: 90 },
  info: { flex: 1, padding: 10, justifyContent: "center" },
});