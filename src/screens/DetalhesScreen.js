import { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { ehFavorito, alternarFavorito } from "../storage/favoritos";

export default function DetalhesScreen({ route }) {
  const { personagem } = route.params;
  const [favorito, setFavorito] = useState(false);

  useEffect(() => {
    async function verificar() {
      setFavorito(await ehFavorito(personagem.id));
    }
    verificar();
  }, [personagem.id]);

  async function aoTocarFavorito() {
    const agoraEhFavorito = await alternarFavorito(personagem);
    setFavorito(agoraEhFavorito);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card>
        <Card.Cover source={{ uri: personagem.image }} />
        <Card.Content style={styles.conteudo}>
          <Text variant="headlineSmall">{personagem.name}</Text>
          <Text variant="bodyLarge">Status: {personagem.status}</Text>
          <Text variant="bodyLarge">Espécie: {personagem.species}</Text>
          <Text variant="bodyLarge">Gênero: {personagem.gender}</Text>
          <Text variant="bodyLarge">Origem: {personagem.origin.name}</Text>
          <Text variant="bodyLarge">
            Última localização: {personagem.location.name}
          </Text>
        </Card.Content>
        <Card.Actions>
          <Button
            mode={favorito ? "contained" : "outlined"}
            icon={favorito ? "heart" : "heart-outline"}
            onPress={aoTocarFavorito}
          >
            {favorito ? "Favoritado" : "Favoritar"}
          </Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 12 },
  conteudo: { paddingTop: 12, gap: 6 },
});