import React, { Component } from "react";
import Modal from "./components/Modal";
//import moment from 'moment'
import moment from 'moment-timezone'
import axios from "axios";
import {
  FormGroup,
  Input,
  Label
} from "reactstrap";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      activeItem: {
        patient: "",
        comments: "",
        start_date: "",
        end_date:"",
        completed: false
      },
      from_date: "",
      to_date: "",
      appList: []
    };
  }
  componentDidMount() {
    this.refreshList();
  }
  handleChange = e => {
    let { name, value } = e.target;
    this.setState({ name: value });
    console.log(this.state)
  };
  refreshList = () => {
    axios
      .get("http://localhost:8000/api/appointments/")
      .then(res => this.setState({ appList: res.data }))
      .catch(err => console.log(err));
  };
  displayCompleted = status => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }
    return this.setState({ viewCompleted: false });
  };
  renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "active" : ""}
        >
          complete
        </span>
        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "" : "active"}
        >
          Incomplete
        </span>
      </div>
    );
  };
  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.appList.filter(
      item => item.completed === viewCompleted
    );
    return newItems.map(item => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${
            this.state.viewCompleted ? "completed-todo" : ""
          }`}
          title={item.comment}
        >
          <h4>
            {item.patient}
          </h4> 
          <div>
            <div>From:</div> {moment(item.start_date).tz('Asia/Shanghai').format('MMMM Do YYYY, h:mm:ss a')} 
          </div>
          <div>
            <div>To:</div>  {moment(item.end_date).tz('Asia/Shanghai').format('MMMM Do YYYY, h:mm:ss a')} 
          </div>

        </span>
        <span>
          <button
            onClick={() => this.editItem(item)}
            className="btn btn-secondary mr-2"
          >
            {" "}
            Edit{" "}
          </button>
          <button
            onClick={() => this.handleDelete(item)}
            className="btn btn-danger"
          >
            Delete{" "}
          </button>
        </span>
      </li>
    ));
  };
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  handleSubmit = item => {
    console.log(item)
    this.toggle();
    if (item.id) {
      axios
        .put(`http://localhost:8000/api/appointments/${item.id}/`, item)
        .then(res => this.refreshList());
      return;
    }
    axios
      .post("http://localhost:8000/api/appointments/", item)
      .then(res => this.refreshList())
      .catch(err => console.log(err));
  };
  handleDelete = item => {
    axios
      .delete(`http://localhost:8000/api/appointments/${item.id}`)
      .then(res => this.refreshList());
  };
  createItem = () => {
    const item = { patient: "", start_date: "", end_date: "", comments: "", completed: false };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  render() {
    return (
      <main className="content">
        <h1 className="text-white text-uppercase text-center my-4">Appointments</h1>
        <div className="row ">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="">
                <button onClick={this.createItem} className="btn btn-primary">
                  Add Appointment
                </button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={(item) => this.handleSubmit(item)}
          />
        ) : null}
      </main>
    );
  }
}
export default App;