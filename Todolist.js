import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TextInput,
  Keyboard,
  Platform,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage'; // Async Storage Lib for key-value pair storage.
const isAndroid = Platform.OS == "android";
const viewPadding = 10;
import styles from './styles';   // The styles are linked here.


export default class Todolist extends Component {
  state = {
    tasks: [],
    text: ""
  };

  changeTextHandler = text => {
    this.setState({ text: text });
  };

  //this method is to add todos.
  addTask = () => {
    let notEmpty = this.state.text.trim().length > 0;
    

    if (notEmpty) {
      this.setState(
        prevState => {
          let { tasks, text } = prevState;
          return {
            tasks: tasks.concat({ key: tasks.length, text: text }),
            text: ""
          };
        },
        () => Tasks.save(this.state.tasks)
      );
    }
  };

  //this method is for deletion of todos
  deleteTask = i => {
    this.setState(
      prevState => {
        let tasks = prevState.tasks.slice();

        tasks.splice(i, 1);

        return { tasks: tasks };
      },
      () => Tasks.save(this.state.tasks)
    );
  };

  UNSAFE_componentWillMount() {
    Tasks.all(tasks => this.setState({ tasks: tasks || [] }));
  }

  render() {
    return (
      <View
        style={[styles.container, { paddingBottom: this.state.viewPadding }]}
      >
        <SafeAreaView style={[styles.container,{width:'100%'}]}>
        <View style={styles.headerStyle}>
          <Text style={styles.headerText}>
            TODO LIST
          </Text>
        </View>
        {/* {console.log(this.state.tasks)} */}
        <FlatList
          style={styles.list}
          data={this.state.tasks}
          // keyExtractor={(index)=>index.toString()}
          renderItem={({ item, index }) =>
            <View styl={{ margin: 10 }}>
              <View style={styles.listItemCont}>

                <Text style={styles.listItem}>
                  {item.text}
                </Text>
                <TouchableOpacity
                  style={{
                    height: 40,
                    width: 100,
                    borderRadius:3,
                    backgroundColor: 'lightgrey',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                  onPress={() => this.deleteTask(index)} >
                  <Text>Delete</Text>
                </TouchableOpacity>
              </View>

            </View>}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>

          <TextInput
            style={styles.textInput}
            onChangeText={this.changeTextHandler}
            value={this.state.text}
            placeholder="List item"
            returnKeyType="done"
            returnKeyLabel="done"
          />
          <TouchableOpacity onPress={this.addTask} style={styles.button}>

            <Text>Add</Text>
          </TouchableOpacity>

        </View>
        </SafeAreaView>
      </View>
    );
  }
}

let Tasks = {
  convertToArrayOfObject(tasks, callback) {
    // console.log("callback",callback,tasks.split("||").map((task, i) => ({ key: i, text: task })))
    return callback(
      tasks ? tasks.split("||").map((task, i) => ({ key: i, text: task })) : []
    );
  },
  convertToStringWithSeparators(tasks) {
    console.log("convert to string:",tasks.map(task => task.text).join("||"))
    return tasks.map(task => task.text).join("||");
  },
  all(callback) {
    return AsyncStorage.getItem("TASKS", (err, tasks) =>
      this.convertToArrayOfObject(tasks, callback)
    );
  },
  save(tasks) {  // stores the key-value pair [todo list item]
    AsyncStorage.setItem("TASKS", this.convertToStringWithSeparators(tasks));
  }
};