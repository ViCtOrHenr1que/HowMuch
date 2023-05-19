import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function Form({ navigation }) {
  const [nomeEstabelecimento, setNomeEstabelecimento] = useState("");
  const [valor, setValor] = useState("");
  const [nomeCategoria, setNomeCategoria] = useState("");

  const handleNomeEstabelecimentoChange = (text) => {
    setNomeEstabelecimento(text);
  };

  const handleValorChange = (text) => {
    setValor(text);
  };

  const handlePickerChange = (itemValue) => {
    setNomeCategoria(itemValue);
  };

  const handleSubmit = async () => {
    try {
      const formData = {
        nomeCategoria,
        nomeEstabelecimento,
        valor,
      };

      const response = await fetch(
        "http://192.168.0.105:3001/app/gastos/registrar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      setNomeCategoria("");
      setNomeEstabelecimento("");
      setValor("");

      const data = await response.json();
      alert("Registro feito com sucesso !");
      console.log("Dados enviados para o servidor:", data);
    } catch (error) {
      console.error("Erro ao enviar dados para o servidor:", error);
    }
  };

  return (
    <View style={estilos.layout}>
      <Text style={estilos.texto}>Categoria de gasto:</Text>
      <Picker selectedValue={nomeCategoria} onValueChange={handlePickerChange}>
        <Picker.Item label="Comida" value="Comida" />
        <Picker.Item label="Alimentação" value="Alimentação" />
        <Picker.Item label="Lanche" value="Lanche" />
        <Picker.Item label="Moradia" value="Moradia" />
        <Picker.Item label="Saúde" value="Saúde" />
        <Picker.Item label="Lazer" value="Lazer" />
        <Picker.Item label="Tecnologia" value="Tecnologia" />
      </Picker>
      <Text style={estilos.texto}>Nome do Estabelecimento:</Text>
      <TextInput
        style={estilos.input}
        placeholder="  Digite o nome do estabelecimento"
        value={nomeEstabelecimento}
        onChangeText={handleNomeEstabelecimentoChange}
      />
      <Text style={estilos.texto}>Valor:</Text>
      <TextInput
        style={estilos.input}
        placeholder="  Digite o valor"
        value={valor}
        onChangeText={handleValorChange}
      />
      <View style={estilos.layoutBotao}>
        <TouchableOpacity style={estilos.botao} onPress={handleSubmit}>
          <Text style={estilos.textoBotao}>Registrar Custo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Listagem")}
          style={estilos.botao}
        >
          <Text style={estilos.textoBotao}>Listar Custo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  layout: {
    marginHorizontal: 32,
  },
  layoutBotao: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  texto: {
    fontSize: 18,
    fontWeight: "400",
    lineHeight: 20,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
  },
  botao: {
    marginTop: 16,
    backgroundColor: "#2A9F85",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 6,
  },
  textoBotao: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    lineHeight: 26,
    fontWeight: "bold",
  },
});
