import React, { useRef, useState } from 'react';
import { Button, StyleSheet, View, TextInput, FlatList, Text } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import commonStyles from './styles/commonstyles'
import { z } from "zod";
interface Todo {
  id: string;
  text: string;
}

const App = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');

  const handleOpenSheet = () => {
    bottomSheetRef.current?.snapToIndex(0);
    console.log(1)
  };

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos((prev) => [...prev, { id: Date.now().toString(), text: newTodo.trim() }]);
      setNewTodo('');
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={commonStyles.container}>
        <View style={commonStyles.headerContainer}>
          <Text style={commonStyles.headerText}>Todo APP</Text>
          <Text style={commonStyles.subHeaderText}>Manage Your checklist here</Text>
        </View>

        <View style={commonStyles.inputContainer}>
          <TextInput
            style={commonStyles.input}
            placeholder="Add a new todo"
            value={newTodo}
            onChangeText={setNewTodo}
          />
          <Button title="Add" onPress={addTodo} />
        </View>

        {todos.length > 0 && (
          <Button title="Show Todos List" onPress={handleOpenSheet} />
        )}

        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={['25%', '50%']}
          enablePanDownToClose={true}
        >
          <View style={commonStyles.sheetContent}>
            <FlatList
              data={todos}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={commonStyles.todoItem}>
                  <Text>{item.text}</Text>
                </View>
              )}
            />
          </View>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subHeaderText: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
  },
  todoItem: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sheetContent: {
    flex: 1,
    padding: 16,
  },
});

export default App;
