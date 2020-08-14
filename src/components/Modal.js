 // frontend/src/components/Modal.js

 import React, { Component } from "react";
 import moment from 'moment'
 import DateTimePicker from 'react-datetime-picker';
 import "flatpickr/dist/themes/material_green.css" 
 import Flatpickr from "react-flatpickr"
 
 import {
   Button,
   Modal,
   ModalHeader,
   ModalBody,
   ModalFooter,
   Form,
   FormGroup,
   Input,
   Label
 } from "reactstrap";

 export default class CustomModal extends Component {
   constructor(props) {
     super(props);
     this.state = {
       activeItem: this.props.activeItem,
       options: {
        minDate: "today",
        enableTime: true,
        minTime: "09:00",
        maxTime: "17:00"
       }
     }
   }

   handleChange = e => {
     let { name, value } = e.target;
     if (e.target.type === "checkbox") {
       value = e.target.checked;
     }
     const activeItem = { ...this.state.activeItem, [name]: value };
     this.setState({ activeItem });
   }

   setStartDate = e => {
    let name = 'start_date'
    let date = moment(e[0]).format()
    const activeItem = { ...this.state.activeItem, [name]: date }
    this.setState({ activeItem })
   }

   setEndDate = e => {
    let name = 'end_date'
    let date = moment(e[0]).format()
    const activeItem = { ...this.state.activeItem, [name]: date }
    this.setState({ activeItem })
   }

   render() {
     const { toggle, onSave } = this.props;
     return (
       <Modal isOpen={true} toggle={toggle}>
         <ModalHeader toggle={toggle}> Todo Item </ModalHeader>
         <ModalBody>
           <Form>
             <FormGroup>
               <Label for="patient">Patient</Label>
               <Input
                 type="text"
                 name="patient"
                 value={this.state.activeItem.patient}
                 onChange={this.handleChange}
                 placeholder="Enter Patient"
               />
             </FormGroup>
             <FormGroup>
               <Label for="start_date">Start Date</Label>
               <div>
                <Flatpickr
                  options={this.state.options}
                  data-enable-time
                  type="datetime-local"
                  name="start_date"
                  value={this.state.activeItem.start_date}
                  onClose={this.setStartDate}
                />
              </div>
             </FormGroup>
             <FormGroup>
               <Label for="end_date">End Date</Label>
               <div>
                <Flatpickr
                  options={this.state.options}
                  data-enable-time
                  type="datetime-local"
                  name="start_date"
                  value={this.state.activeItem.end_date}
                  onClose={this.setEndDate}
                />
              </div>
             </FormGroup>
             <FormGroup>
               <Label for="comments">Comments</Label>
               <Input
                 type="text"
                 name="comments"
                 value={this.state.activeItem.comments}
                 onChange={this.handleChange}
                 placeholder="Enter Comments"
               />
             </FormGroup>
             <FormGroup check>
               <Label for="completed">
                 <Input
                   type="checkbox"
                   name="completed"
                   checked={this.state.activeItem.completed}
                   onChange={this.handleChange}
                 />
                 Completed
               </Label>
             </FormGroup>
           </Form>
         </ModalBody>
         <ModalFooter>
           <Button color="success" onClick={() => onSave(this.state.activeItem)}>
             Save
           </Button>
         </ModalFooter>
       </Modal>
     );
   }
 }