import { useEffect, useState } from "react";
import {
  View,
  Image,
  FlatList,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from "react-native";
import { ActivityIndicator, Card, Text } from "react-native-paper";
import { tema } from "../theme";

const API_URL = "https://rickandmortyapi.com/api/character";
const WIKI_URL = "https://rickandmorty.fandom.com/wiki/Rickipedia";

export default function ListaScreen({ navigation }) {
  const [personagens, setPersonagens] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregarPersonagens() {
      try {
        const resposta = await fetch(API_URL);
        if (!resposta.ok) {
          throw new Error(`Erro ${resposta.status} ao buscar os dados`);
        }
        const dados = await resposta.json();
        setPersonagens(dados.results);
      } catch (e) {
        setErro(e.message);
      } finally {
        setCarregando(false);
      }
    }
    carregarPersonagens();
  }, []);

  if (carregando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" />
        <Text style={styles.textoAux}>Carregando personagens...</Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={styles.centro}>
        <Text style={styles.erro}>Não foi possível carregar: {erro}</Text>
      </View>
    );
  }

  return (
    <View style={styles.tela}>
      <FlatList
        data={personagens}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ padding: 12, paddingBottom: 100 }}
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
                <Text variant="bodyMedium">Origem: {item.origin.name}</Text>
              </View>
            </View>
          </Card>
        )}
      />

      <TouchableOpacity
        style={styles.flutuante}
        activeOpacity={0.8}
        onPress={() => Linking.openURL(WIKI_URL)}
      >
        <Image source={require("../../assets/morty.png")} style={styles.morty} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1 },
  centro: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  textoAux: { marginTop: 10 },
  erro: { color: "#c0392b", textAlign: "center" },
  card: { marginBottom: 12, overflow: "hidden" },
  linhaCard: { flexDirection: "row" },
  foto: { width: 110, height: 110 },
  info: { flex: 1, padding: 10, justifyContent: "center" },
  flutuante: {
    position: "absolute",
    right: 20,
    bottom: 24,
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: tema.colors.surface,
    borderWidth: 2,
    borderColor: tema.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
  },
  morty: { width: 54, height: 54 },
});