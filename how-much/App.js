import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import PaginaInicial from "./src/pages/TelaInicial/PaginaInicial";
import TelaDeListagem from "./src/pages/TelaDeListagem";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Inicio" component={PaginaInicial} />
        <Stack.Screen name="Listagem" component={TelaDeListagem} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
