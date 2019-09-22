import React from "react"
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch} from '@fortawesome/free-solid-svg-icons'
import onClickOutside from 'react-onclickoutside'

library.add(faSearch)
class SearchBar extends React.Component{
  state={
    userInput:"",
    word:"",
    hidden:true
  }
  handleChange=(e)=>{
      this.setState({
        userInput:e.target.value,
        word:e.target.value,
      })
  }
  handleClickOutside = () => {
    this.props.resetSearchBarClicked()
  }
render(){
  return (
    <div style={container}>
    <div style={searchContainer}>
    <FontAwesomeIcon style={searchIcon} icon="search"/>
    <input style={searchBox} type="search" placeholder="Search..."
    onClick={this.props.onClick} onChange ={this.handleChange} value={this.state.userInput}/>
  </div>
    </div>
  )
}
}
const container={
  display:"flex",
  alignItems:"center",
  paddingRight:"3%",
}
const searchContainer={
  display: "grid",
  gridTemplateColumns:".5fr 2fr 1fr",
  border: "1px solid #ccc",
  borderRadius: 3,
  overflow: "hidden",
  margin:"auto",
}
const searchIcon= {
  margin:"auto",
  gridRow:1,
  gridColumn:"1/2",
  paddingLeft:3,
} 
const searchBox ={
  border: 0,
  gridColumn:"2/4",
  gridRow:1,
  outline:"none",
  borderLeft:"1px solid #ccc",
  padding:10,
  fontSize:18
}

const icon={
  fontSize:25,
  padding:8
}
export default onClickOutside(SearchBar)
