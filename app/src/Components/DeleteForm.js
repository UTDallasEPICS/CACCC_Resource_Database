import React from "react"
import "./AddForm.css"
class DeleteForm extends React.Component{
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
    return (
      <div class="container">
  <div id="contact">
    <h3>Modify Contact</h3>
      <div contentEditable="true" placeholder="Name" name="name" type="text" onChange={this.handleChange} >{this.props.arr[0].name}</div>
     <div contentEditable="true" placeholder="Email Address" name="email" type="text" onChange={this.handleChange}>{this.props.arr[0].email}</div>
      <div contentEditable="true" placeholder="Address" name="address" type="text" onChange={this.handleChange}>{this.props.arr[0].address}</div>
      <div contentEditable="true" placeholder="Phone Number" name="phone" type="tel" onChange={this.handleChange}>{this.props.arr[0].phone}</div>
      <div contentEditable="true" placeholder="Website" name="website" type="url" onChange={this.handleChange}>{this.props.arr[0].website}</div>
      <textarea placeholder="Description" name="description" onChange={this.handleChange}>{this.props.arr[0].description}</textarea>
      <button >UPDATE</button>
      <button onClick={()=>this.props.deleteComponent(this.props.arr[0].id)}>DELETE</button>
  </div>
  </div>
    )
  }
}
export default DeleteForm
