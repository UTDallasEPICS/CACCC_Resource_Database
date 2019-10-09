import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import {BrowserRouter, Route} from "react-router-dom";
import ClientPages from './Components/ClientPages'
import AddForm from './Components/AddForm'
class App extends React.Component{
  state={
    arr:[
      {
        name:"a",
        email:"b,",
        address:"c",
        phone:"d",
        website:"e",
        description:"f",
        id:"423"
      }
    ]
  }
  addComponent=(a,b,c,d,e,f)=>{
    const obj={
      name:a,
      email:b,
      address:c,
      phone:d,
      website:e,
      description:f,
      id:c+d
    }
    this.setState({
      arr:[...this.state.arr,obj]
    })
  }
  updateComponent=(a,b,c,d,e,f)=>{
    const obj={
      name:a,
      email:b,
      address:c,
      phone:d,
      website:e,
      description:f,
    }
    let i=this.getIndex(a,this.state.arr)
    const newItems = [...this.state.arr];
    newItems[i] = obj;
    this.setState({ arr:newItems });
    console.log("h")

  }
   getIndex=(value, arr)=> {
    for(let i = 0; i < arr.length; i++) {
        if(arr[i][6] === value) {
            return i;
        }
    }
    return -1; //to handle the case where the value doesn't exist
}
deleteComponent=(a)=>{
  this.setState({
    arr:this.state.arr.filter(list=>list.id!=a)
  })
}
  render(){
    return (
    <BrowserRouter>
      <Navbar
      addComponent={this.addComponent}/>
      <Route path="/ClientPages"
      render = {(props) => <ClientPages {...props} arr={this.state.arr}
      updateComponent={this.updateComponent}
      deleteComponent={this.deleteComponent}/> }/>
      <Route path="/Home" component = {null}/>
    </BrowserRouter>
  );
}
}

export default App;
