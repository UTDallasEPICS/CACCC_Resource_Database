import React from "react"
import SearchBar from "./SearchBar"
import SearchList from "./SearchList/SearchList"
import './Navbar.css';
import AddForm from "../AddForm"
class Navbar extends React.Component{
  state={
    searchBarClicked:false,
    addFormClicked:false
  }
  onClick = ()=>{
    this.setState({searchBarClicked:true})
  }
  onClickForm = ()=>{
    this.setState({addFormClicked:!this.state.addFormClicked})
  }
  resetOnClickForm = ()=>{
    this.setState({addFormClicked:false})
  }
  resetSearchBarClicked =()=>{
    this.setState({searchBarClicked:false})
  }
  render(){
    return(
      <div style={container}>
      <ul>
  <li><a href="#home">Home</a></li>
  <li class="dropdown">
    <a class="dropbtn">Resources</a>
    <div class="dropdown-content">
      <a href="#">Drug And Alcohol Resources</a>
      <a href="#">Educational Resources</a>
      <a href="#">Ethnic & Diversity Resources</a>
      <a href="#">Disability Resources</a>
      <a href="#">Transportation Resources</a>
      <a href="#">Edit</a>
    </div>
  </li>
   <li class="dropdown">
    <a class="dropbtn">Services</a>
    <div class="dropdown-content">
      <a href="#">Adoption Services</a>
      <a href="#">Parenting Classes</a>
      <a href="#">Pet Services</a>
      <a href="#">Edit</a>
    </div>
  </li>
  <li class="dropdown">
   <a class="dropbtn">Help</a>
   <div class="dropdown-content">
     <a href="#">Basic Care Group</a>
     <a href="#">Behavioral Health</a>
     <a href="#">Child Care</a>
     <a href="#">Child Support</a>
     <a href="#">Emergency Housing</a>
     <a href="#">Financial Assistance</a>
     <a href="#">Legal Help</a>
     <a href="#">Edit</a>

   </div>
 </li>
  <li class="dropdown">
   <a class="dropbtn">Other</a>
   <div class="dropdown-content">
     <a href="/ClientPages">Client Pages</a>
     <a href="#">Food Pantries</a>
     <a href="#">Job Assistance</a>
     <a href="#">Edit</a>
   </div>
 </li>
 <button style={addButton} onClick={this.onClickForm}>ADD</button>
 {this.state.addFormClicked ? <AddForm resetOnClickForm={this.resetOnClickForm} addComponent={this.props.addComponent}/>:null}
</ul>
<div stlye={searchBarContainer}>
<SearchBar onClick={this.onClick}
resetSearchBarClicked={this.resetSearchBarClicked}/>
<SearchList searchBarClicked={this.state.searchBarClicked}/>
<div style={pageName}>Client Pages</div>
</div>
</div>

    )
  }
}
const container={
  display:"flex",
  width:"100vw",
  justifyContent:"space-between",
  alignItems:"center",
  backgroundColor: "hsl(0, 0, 100%)",
  boxShadow: "0px 1px 26px -8px rgba(0,0,0,.3)",
}
const searchBarContainer={
  width:"100%",
  position:"relative",
  display:"flex",
  alignItems:"flex-end",
  margin:100
}
const addButton={
  border:"none",
  width:120,
  height:35,
  position:"relative",
  top:9,
  borderRadius:5,
  marginLeft:10,
  cursor:"pointer"
}
const pageName={
  position:"absolute",
  left:5,
  top:80,
  fontSize:30,
  cursor:"default",
  background:"lightgrey",
  padding:5,
  borderRadius:3
}
export default Navbar
