import * as Paper from "react-native-paper";

// Funciona nas duas nomenclaturas do Paper (MD3DarkTheme ou DarkTheme)
const base = Paper.MD3DarkTheme ?? Paper.DarkTheme;

export const tema = {
  ...base,
  colors: {
    ...base.colors,
    primary: "#97ce4c",
    onPrimary: "#10240a",
    primaryContainer: "#2d4a14",
    onPrimaryContainer: "#c8f08f",
    secondary: "#44d9e6",
    onSecondary: "#00363b",
    background: "#0d1117",
    onBackground: "#e6edf3",
    surface: "#161b22",
    onSurface: "#e6edf3",
    surfaceVariant: "#21262d",
    onSurfaceVariant: "#9fb0c0",
    outline: "#3d4450",
    elevation: {
      ...base.colors.elevation,
      level1: "#1c232c",
      level2: "#222b35",
    },
  },
};