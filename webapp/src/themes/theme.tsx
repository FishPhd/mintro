import {
  ColorMode,
  extendTheme,
  ThemeConfig,
  useColorModeValue,
} from "@chakra-ui/react";

const mintroTheme = extendTheme({
  layerStyles: {
    card: {
      shadow: "base",
      bg: "white",
      rounded: "lg",
      py: "6",
      px: "4",
    },
  },
  colors: {
    dark: {
      25: "#FCFCFC",
      50: "#F4F4F4",
      100: "#D6D6D5",
      200: "#AEADAC",
      300: "#888785",
      400: "#646260",
      500: "#423F3D",
    },
    mintro: {
      900: "#1C4532",
      800: "#22543D",
      700: "#276749",
      600: "#25855A",
      500: "#38A169",
      400: "#48BB78",
      300: "#68D391",
      200: "#9AE6B4",
      100: "#C6F6D5",
      50: "#F0FFF4",
    },
  },
  fonts: {
    heading: "Poppins",
    body: "Poppins",
  },
  components: {
    Button: {
      baseStyle: { _focus: { boxShadow: "none" } },
      variants: {
        mintro: {
          bgGradient: "linear(to-tr, mintro.200, mintro.300)",
          _hover: { filter: "opacity(90%)" },
        },
      },
    },
    Popover: { baseStyle: { _focus: { boxShadow: "none" } } },
    Select: { baseStyle: { _focus: { outline: "none" } } },
  },
  styles: {
    global: {
      img: { objectFit: "fill !important" },
    },
  },
});

const mintroMode: ThemeConfig = extendTheme({
  initialColorMode: "light" as ColorMode,
  useSystemColorMode: false,
});

export { mintroMode, mintroTheme };
