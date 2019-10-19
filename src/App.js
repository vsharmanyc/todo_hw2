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
let bool1 = false;
let bool2 = false;
let bool3 = false;

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
    bool1 = !bool1;
    let copy = [...this.state.todoLists]; 
    for(let i = 0; i < copy.length; i++)
      {
        if(copy[i] == this.state.currentList)
          copy[i].items.sort(this.descComp);
      }
      this.setState({todolists: copy});
      this.resetKeys();
  }

  descComp(item1, item2){
    let temp;
    
    if(bool1)
    {
      temp = item1;
      item1 = item2;
      item2 = temp;
    }
    console.log(item1);
    console.log(item2);
    
    if (item1.description < item2.description)
      return -1;
    else if (item1.description > item2.description)
      return 1;
    else
      return 0;
  }

  sortByDueDate = () => {
    bool2 = !bool2;
    let copy = [...this.state.todoLists]; 
    for(let i = 0; i < copy.length; i++)
      {
        if(copy[i] == this.state.currentList)
          copy[i].items.sort(this.dateComp);
      }
      this.setState({todolists: copy});
      this.resetKeys();
  }

  dateComp(date1, date2)
  {
    let temp;
    if(bool2)
    {
      temp = date1;
      date1 = date2;
      date2 = temp;
    }
    if (date1.due_date < date2.due_date)
      return -1;
    else if (date1.due_date > date2.due_date)
      return 1;
    else
      return 0;
  }

  sortByStatus = () => {
    bool3 = !bool3;
    let copy = [...this.state.todoLists]; 
    for(let i = 0; i < copy.length; i++)
      {
        if(copy[i] == this.state.currentList)
          copy[i].items.sort(this.statusComp);
      }
      this.setState({todolists: copy});
      this.resetKeys();
  }

  statusComp(item1, item2)
  {
    let temp;
    if(bool3)
    {
      temp = item1;
      item1 = item2;
      item2 = temp;
    }
    if (item1.completed < item2.completed)
      return -1;
    else if (item1.completed > item2.completed)
      return 1;
    else
      return 0;
  }

  resetKeys(){
    let list = [...this.state.todoLists];
    for(let i = 0; i < list.length; i++){
      if(list[i] == this.state.currentList){
        for(let j = 0; j < list[i].items.length; j++){
          list[i].items[j].key = j;
        }
      }
    }  
    this.setState({todoLists:list});
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