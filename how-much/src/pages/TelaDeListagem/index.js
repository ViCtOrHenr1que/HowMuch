import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
} from "react-native";

export default function TelaDeListagem({ navigation }) {
  const [gastos, setGastos] = useState([]);
  const [originalGastosData, setOriginalGastosData] = useState([]);

  useEffect(() => {
    fetchGastos();
  }, []);

  const fetchGastos = async () => {
    try {
      const response = await fetch("http://192.168.0.105:3001/app/categorias");
      const gastos = await response.json();
      setOriginalGastosData(gastos);
      setGastos(gastos);
    } catch (error) {
      console.error("Erro ao buscar os gastos:", error);
    }
  };
  const handleLongPress = (item) => {
    Alert.alert("Excluir Gasto", "Deseja excluir o lançamento?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Excluir",
        onPress: () => deleteGasto(item._id),
        style: "destructive",
      },
    ]);
  };
  const deleteGasto = async (gastoId) => {
    try {
      await fetch(`http://192.168.0.105:3001/app/gastos/eliminar/${gastoId}`, {
        method: "DELETE",
      });
      fetchGastos();
    } catch (error) {
      console.error("Erro ao eliminar gasto ", error);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={estilos.itemContainer}>
        <Text
          onLongPress={() => handleLongPress(item)}
          style={estilos.itemText}
        >
          {item.nomeEstabelecimento} - R$ {item.valor}
        </Text>
      </View>
    );
  };

  const removeAcentos = (texto) => {
    const mapAcentos = {
      a: /[áàãâä]/gi,
      e: /[éèêë]/gi,
      i: /[íìîï]/gi,
      o: /[óòõôö]/gi,
      u: /[úùûü]/gi,
      c: /[ç]/gi,
      n: /[ñ]/gi,
    };

    for (let letra in mapAcentos) {
      texto = texto.replace(mapAcentos[letra], letra);
    }

    return texto;
  };

  const search = (s) => {
    const termoDaPesquisa = removeAcentos(s.toLowerCase());
    let array = JSON.parse(JSON.stringify(originalGastosData));
    setGastos(
      array.filter((gasto) =>
        removeAcentos(gasto.nomeEstabelecimento.toLowerCase()).includes(
          termoDaPesquisa
        )
      )
    );
  };

  return (
    <View style={estilos.layout}>
      <TextInput
        style={estilos.inputDeBusca}
        placeholder="  search"
        onChangeText={(s) => search(s)}
        autoCapitalize="none"
      />

      <View styles={estilos.container}>
        <FlatList
          data={gastos}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        />
      </View>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={estilos.botaoIncluir}
      >
        <Text style={estilos.TextoBotaoIncluir}>Incluir novos custos</Text>
      </TouchableOpacity>
    </View>
  );
}

const estilos = StyleSheet.create({
  layout: {
    marginHorizontal: 32,
  },
  inputDeBusca: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  listContainer: {
    paddingBottom: 16,
  },
  itemContainer: {
    marginBottom: 8,
    padding: 12,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#c5c7db",
    borderBottomStyle: "solid",
  },
  itemText: {
    fontSize: 16,
    color: "#333",
  },
  botaoIncluir: {
    alignItems: "center",
    marginTop: 16,
    backgroundColor: "#2A9F85",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 6,
  },
  TextoBotaoIncluir: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    lineHeight: 26,
    fontWeight: "bold",
  },
});
