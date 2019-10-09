import React from "react"
import AddForm from "./AddForm"
import DeleteForm from "./DeleteForm"
class ClientPages extends React.Component{
  state={
    displayDeleteForm:false
  }
  showDeleteForm=()=>{
    this.setState({displayDeleteForm:!this.state.displayDeleteForm})
  }
  render(){
    return (
      <div>
      <div style={container}>
        {this.props.arr.map((list, i)=>{
          return <div style={centerList}>
          <div key={i}>
            <div style={contactInfoContainer}>
            <div style={contactInfoName}>Workforce Investment Act Youth Service</div>
            <div style={address}>800 W Campbell Rd, Richardson, TX 75080</div>
            <div style={contactInfoDescription}>Offers year around work experience, educational assistance and job skills to youth ages 12-18 years. (Replaced
                 JTPA) North Central Texas Workforce Youth Recruiter
            </div>
            <hr/>
            <div style={contactInfoListContainer}>
            <div style={contactInfoList}>
              (469) 229-0099
            </div>
            <div style={contactInfoList}>
              http://northtexas.jobcorps.gov/
            </div>
            </div>
            </div>
            <button key={i} onClick={this.showDeleteForm}>EDIT</button>
            {this.state.displayDeleteForm ? <DeleteForm
              arr={this.props.arr}
              updateComponent={this.props.updateComponent}
              deleteComponent={this.props.deleteComponent}/>: null} </div>           </div>
        })}
      </div>
      </div>
    )
  }
}
const centerList={
  display:"flex",
  justifyContent:"center"
}
const container={
  height:"100vh",
  width:"100vw",
  overflow:"auto",
}
const contactInfoContainer={
  width:"70vw",
  height:"auto",
  background:"white",
  borderRadius:5,
  margin:5,
  boxShadow:" 0px 0px 1px 0px rgba(0,0,0,0.2)",
}
const contactInfoName={
  fontSize:24,
  fontWeight:"bold",
  padding:"8px 0 0 8px",
}
const contactInfoDescription={
  fontSize:20,
  color:"grey",
  padding:10
}
const address={
  fontSize:21,
  color:"darkgrey",
  padding:"5px 10px 0 10px"
}
const contactInfoListContainer={
  display:"flex",
  justifyContent:"flex-start",
}
const contactInfoList={
  padding:10,
}

export default ClientPages
