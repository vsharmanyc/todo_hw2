import React, { Component } from 'react';
import testTodoListData from './TestTodoListData.json'
import HomeScreen from './components/home_screen/HomeScreen'
import ItemScreen from './components/item_screen/ItemScreen'
import ListScreen from './components/list_screen/ListScreen'

const AppScreen = {
  HOME_SCREEN: "HOME_SCREEN",
  LIST_SCREEN: "LIST_SCREEN",
  ITEM_SCREEN: "ITEM_SCREEN"
}

let dictionary = {
  key: "",
  description: "",
  due_date: "",
  assigned_to: "",
  completed: ""
};

class App extends Component {
  state = {
    currentScreen: AppScreen.HOME_SCREEN,
    todoLists: testTodoListData.todoLists,
    currentList: null
  }

  goHome = () => {
    this.setState({currentScreen: AppScreen.HOME_SCREEN});
    this.setState({currentList: null});
  }

  textFieldChanged(){
    
  }

  moveUp = (key) => {
    console.log("moveUp");
    console.log(key);
    if(key != 0){
      let list = [...this.state.todoLists];
      for(let i = 0; i < list.length; i++){
        if(list[i] == this.state.currentList){
          let temp = list[i].items[key]
          list[i].items[key] =  list[i].items[key - 1];
          list[i].items[key - 1] = temp;
          list[i].items[key].key += 1;
          list[i].items[key - 1].key -= 1;
        }
      }  
    this.setState({todoLists:list});
    }
  }

  moveDown = (key) => {
    console.log("moveDown");
    console.log(key);
    let list = [...this.state.todoLists];
    if(key != list.length - 1){
      for(let i = 0; i < list.length; i++){
        if(list[i] == this.state.currentList){
          let temp = list[i].items[key]
          list[i].items[key] =  list[i].items[key + 1];
          list[i].items[key + 1] = temp;
          list[i].items[key].key -= 1;
          list[i].items[key + 1].key += 1;
        }
      }  
    this.setState({todoLists:list});
    }
  }

  deleteItem = (key) => {
    console.log("deleteItem");
    console.log(key);
    let list = [...this.state.todoLists];
    for(let i = 0; i < list.length; i++){
      if(list[i] == this.state.currentList){
        list[i].items.splice(key,1);
        for(let j = key; j < list[i].items.length; j++){
          list[i].items[j].key -= 1;
        }
      }
    }  
    this.setState({todoLists:list});
  }

  nameChange = (e) => {
    console.log("change");
    if(e.target.name == "name")
    {
      console.log("name");
      let copy = [...this.state.todoLists];
      for(let i = 0; i < copy.length; i++)
      {
        if(copy[i] == this.state.currentList)
          copy[i].name = e.target.value;
      }
      this.setState({todolists: copy});
    }
    else if(e.target.name == "owner")
    {
      console.log("owner");
      let copy = [...this.state.todoLists];
      for(let i = 0; i < copy.length; i++)
      {
        if(copy[i] == this.state.currentList)
          copy[i].owner = e.target.value;
      }
      this.setState({todolists: copy});
    }
    
  }

  addListItem = () =>{
    this.setState({currentScreen: AppScreen.ITEM_SCREEN})
  }

  addInfo = (e) =>{
    if(e.target.name == "description")
    {
      dictionary.description = e.target.value;
    }
    else if(e.target.name == "assignedTo")
    {
      dictionary.assigned_to = e.target.value;
    }
    else if(e.target.name == "date")
    {
      dictionary.due_date = e.target.value;
    }
    else if(e.target.name == "completed")
    {
      dictionary.completed = e.target.checked;
    }
  }

  sortByTask = () => {
    console.log("sortByTask");
  }

  sortByDueDate = () => {
    console.log("sortByDueDate");
  }

  sortByStatus = () => {
    console.log("sortByStatus");
  }
  
  cancel = () => {
    this.setState({currentScreen: AppScreen.LIST_SCREEN})
    dictionary.description = "";
    dictionary.assigned_to = "";
    dictionary.completed = "";
    dictionary.due_date = "";
  }

  submit = () => {
    let copy = [...this.state.todoLists];
    for(let i = 0; i < copy.length; i++)
    {
      if(copy[i] == this.state.currentList)
      {
        dictionary.key = copy[i].items.length;
        let dcopy = JSON.parse(JSON.stringify(dictionary));
        copy[i].items.push(dcopy);
        break;
      }
    }
    this.setState({todolists: copy});
    this.setState({currentScreen: AppScreen.LIST_SCREEN});
    dictionary.description = "";
    dictionary.assigned_to = "";
    dictionary.completed = "";
    dictionary.due_date = "";

  }

  loadList = (todoListToLoad) => {
    this.setState({currentScreen: AppScreen.LIST_SCREEN});
    this.setState({currentList: todoListToLoad});
    console.log("currentList: " + this.state.currentList);
    console.log("currentScreen: " + this.state.currentScreen);
  }

  render() {
    switch(this.state.currentScreen) {
      case AppScreen.HOME_SCREEN:
        return <HomeScreen 
        loadList={this.loadList.bind(this)} 
        todoLists={this.state.todoLists} />;
      case AppScreen.LIST_SCREEN:            
        return <ListScreen
          goHome={this.goHome.bind(this)}
          todoList={this.state.currentList}
          moveUp={this.moveUp}
          moveDown={this.moveDown}
          deleteItem={this.deleteItem}
          addListItem={this.addListItem}
          nameChange={this.nameChange} 
          sortByTask={this.sortByTask}
          sortByDueDate={this.sortByDueDate}
          sortByStatus={this.sortByStatus}
          />;
      case AppScreen.ITEM_SCREEN:
        return <ItemScreen 
        addInfo={this.addInfo}
        dictionary={dictionary}
        submit={this.submit}
        cancel={this.cancel}/>;
      default:
        return <div>ERROR</div>;
    }
  }
}

export default App;