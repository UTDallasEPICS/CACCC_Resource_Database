import React from "react"
class ClientPages extends React.Component{
  render(){
    return (
      <div>
      <div style={container}>
      <div style={contactInfoContainerWrapper}>
        <div style={contactInfoContainer}>
        <div style={contactInfoName}>Workforce Investment Act Youth Service</div>
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
        <button class="editButton">EDIT</button>
        </div>
        <div style={contactInfoContainerWrapper}><div style={contactInfoContainer}></div><button class="editButton">EDIT</button></div>
        <div style={contactInfoContainerWrapper}><div style={contactInfoContainer}></div><button class="editButton">EDIT</button></div>
        <div style={contactInfoContainerWrapper}><div style={contactInfoContainer}></div><button class="editButton">EDIT</button></div>
        <div style={a}/>
      </div>
      </div>
    )
  }
}
const contactInfoContainerWrapper={
  position:"relative"

}
const container={
  height:"100vh",
  width:"100vw",
  display:"flex",
  justifyContent:"center",
  flexWrap:"wrap",
  overflow:"auto",
}
const contactInfoContainer={
  width:"70vw",
  minHeight:"20vh",
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
const a={
  width:"70vw",
  height:"20vh",
  background:"transparent"
}
const contactInfoListContainer={
  display:"flex",
  justifyContent:"flex-start",
}
const contactInfoList={
  padding:10,
}

export default ClientPages
