import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList
} from 'react-native'

import { FontAwesome } from '@expo/vector-icons'

import Tarefa from './src/Tarefa'

export default function App() {
  const [tarefa, setTarefa] = useState('');

  const [list, setList] = useState([]);

  function handleAdd() {
    if (tarefa === '') {
      return;
    }

    const dados = {
      key: Date.now(),
      item: tarefa
    }

    setList(oldArray => [dados, ...oldArray])

    setTarefa('')
  }

  function handleDelete(item) {
    let filtroItem = list.filter((tarefa) => { // vai entrar em cada item do array e devolver um array com base na condição que eu colocar
      return (tarefa.item !== item) // vai devolver um array com todas as tarefas diferentes das que eu estou cliando
    });

    setList(filtroItem)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tarefas</Text>

      <View style={styles.containerInput}>
        <TextInput
          placeholder='Digite sua tarefa'
          style={styles.input}
          value={tarefa}
          onChangeText={(text) => setTarefa(text)}
        />
        <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
          <FontAwesome name="plus" size={24} color='#fff' />
        </TouchableOpacity>
      </View>

      <FlatList
        data={list}  // a lista que eu quero mostrar
        keyExtractor={(item) => item.key} // a key ou id de cada item da lista
        renderItem={({ item }) => <Tarefa data={item} deleteItem={() => handleDelete(item.item)} />} // vai andar pelo array e tem que colocar qual propriedade queremos mostrar da lista, nesse caso a tarefa
        style={styles.list}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#22272e",
    paddingTop: 28,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#fff',
    marginTop: '5%',
    paddingStart: '5%',
    marginBottom: 12,
  },
  containerInput: {
    flexDirection: "row",
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22
  },
  input: {
    width: '75%',
    backgroundColor: '#FBFBFB',
    height: 44,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  buttonAdd: {
    width: '15%',
    height: 44,
    backgroundColor: '#73f7ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginStart: 15,
    borderRadius: 4
  },
  list: {
    flex: 1,// quer dizer para pegar o restante da tela
    backgroundColor: '#fff',
    paddingStart: "4%",
    paddingEnd: '4%'

  }
})