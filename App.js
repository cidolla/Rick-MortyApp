import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const API_URL = "https://rickandmortyapi.com/api/character";

export default function App() {
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
        <ActivityIndicator size="large" color="#97ce4c" />
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
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Rick and Morty</Text>
      <FlatList
        data={personagens}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ padding: 12 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.foto} />
            <View style={styles.info}>
              <Text style={styles.nome}>{item.name}</Text>
              <Text style={styles.linha}>Status: {item.status}</Text>
              <Text style={styles.linha}>Espécie: {item.species}</Text>
              <Text style={styles.linha}>Origem: {item.origin.name}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingTop: StatusBar.currentHeight || 0,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 12,
  },
  centro: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  textoAux: { marginTop: 10, fontSize: 16 },
  erro: { color: "#c0392b", fontSize: 16, textAlign: "center" },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 12,
    overflow: "hidden",
    elevation: 2,
  },
  foto: { width: 110, height: 110 },
  info: { flex: 1, padding: 10, justifyContent: "center" },
  nome: { fontSize: 18, fontWeight: "bold", marginBottom: 4 },
  linha: { fontSize: 14, color: "#444" },
}); 