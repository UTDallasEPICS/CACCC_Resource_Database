import React from "react"
import "./AddForm.css"
class AddForm extends React.Component{
  state={
    name:"",
    email:"",
    address:"",
    phone:"",
    website:"",
    description:""
  }
  handleChange=(e)=>{
      this.setState({
        [e.target.name]:e.target.value
      })
  }
  render(){
    return(
      <div class="container">
      <div id="contact">
    <h3>Add Contact</h3>
      <input placeholder="Name" name="name" type="text" onChange={this.handleChange} />
     <input placeholder="Email Address" name="email" type="text" onChange={this.handleChange} />
      <input placeholder="Address" name="address" type="text" onChange={this.handleChange}/>
      <input placeholder="Phone Number" name="phone" type="tel" onChange={this.handleChange}/>
      <input placeholder="Website" name="website" type="url" onChange={this.handleChange}/>
      <textarea placeholder="Description" name="description" onChange={this.handleChange}></textarea>
      <button onClick={this.props.reset} onClick={()=>this.props.addComponent("a","a","a","a","a","a")}>ADD</button>
  </div>
</div>
    )
  }
}
export default AddForm
