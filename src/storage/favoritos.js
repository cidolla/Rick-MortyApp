import AsyncStorage from "@react-native-async-storage/async-storage";

const CHAVE = "@rickmorty:favoritos";

export async function carregarFavoritos() {
  try {
    const json = await AsyncStorage.getItem(CHAVE);
    return json ? JSON.parse(json) : [];
  } catch (e) {
    return [];
  }
}

export async function ehFavorito(id) {
  const favoritos = await carregarFavoritos();
  return favoritos.some((p) => p.id === id);
}

export async function alternarFavorito(personagem) {
  const favoritos = await carregarFavoritos();
  const jaExiste = favoritos.some((p) => p.id === personagem.id);
  const novaLista = jaExiste
    ? favoritos.filter((p) => p.id !== personagem.id)
    : [...favoritos, personagem];
  await AsyncStorage.setItem(CHAVE, JSON.stringify(novaLista));
  return !jaExiste;
}