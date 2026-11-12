# Rick and Morty App

Aplicativo mobile feito com **React Native + Expo** que consome a [Rick and Morty API](https://rickandmortyapi.com/) e exibe os personagens da série.

## Funcionalidades

- Lista de personagens consumida da API, com carregamento e tratamento de erro
- Tela de detalhes de cada personagem
- Favoritos salvos localmente no aparelho com **AsyncStorage**
- Navegação entre telas (Lista, Detalhes e Favoritos) com **React Navigation**
- Interface com **React Native Paper**, tema escuro personalizado
- Botão flutuante que abre a Rickipedia no navegador

## Tecnologias

- React Native e Expo
- React Navigation (native stack)
- React Native Paper
- AsyncStorage

## Como rodar

```bash
git clone https://github.com/cidolla/Rick-MortyApp.git
cd Rick-MortyApp
npm install
npx expo start
```

Escaneie o QR code com o app **Expo Go** no celular.

## Estrutura

```
├── App.js                 # Navegação e tema
├── assets/                # Logo e ícone
└── src/
    ├── screens/           # Lista, Detalhes e Favoritos
    ├── storage/           # Funções do AsyncStorage
    └── theme.js           # Cores do tema
```

## Autor

Cid José Espíndola Filho ([@cidolla](https://github.com/cidolla))

---

Projeto acadêmico, sem fins lucrativos. Personagens e imagens de Rick and Morty pertencem aos seus respectivos detentores.