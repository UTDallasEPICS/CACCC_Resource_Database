import React from "react"
import "./SearchList.css"
class SearchList extends React.Component{

  render(){
    if(this.props.searchBarClicked)
    return (
      <div style={container}>
      <div>
         <div class="searchListContainer">Help</div>
         <div class="searchListContainer">Basic Care Group</div>
         <div class="searchListContainer">Behavioral Health</div>
         <div class="searchListContainer">Child Care</div>
         <div class="searchListContainer">Child Support</div>
         <div class="searchListContainer">Emergency Housing</div>
         <div class="searchListContainer">Financial Assistance</div>
         <div class="searchListContainer">Legal Help</div>
     </div>
      </div>
    )
    else {
      return(
        <div/>
      )
    }
  }
}
const container={
  width:270,
  height:350,
  position:"absolute",
  borderRadius:5,
  background:"red",
  fontSize:20,
  marginTop:5,
  zIndex:2
  }

const hide={
  visibility:"hidden"
}
export default SearchList
