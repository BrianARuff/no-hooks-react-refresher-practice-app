import * as React from "react";
import styled from "styled-components";
import axios from "axios";

type STATE = {
  username: string,
  password: string,
  users: [],
}

const FormController = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
  border: 1px solid #000;
  margin: 1rem;
`

const Input = styled.input`
  border: 1px solid red;

  &:hover {
    border-color: aqua;
  }
`

export default class Form extends React.Component<{}, STATE> {
  constructor(props: {}) {
    super(props);
    this.state = {
      username: "",
      password: "",
      users: [],
    }
    this.handleFormInput = this.handleFormInput.bind(this);
    this.handleAddUser = this.handleAddUser.bind(this);
  }

  username = React.createRef<HTMLInputElement>();
  password = React.createRef<HTMLInputElement>()

  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/todos")
      .then(({data}) => {
        this.setState(() => {
          return {
            users: data
          }
        })
      })
      .catch(err => {
        throw new Error(err);
      })
  }

  handleFormInput(e: any) {
    this.setState((state: STATE,) => ({
        ...state,
        [e.target.name]: e.target.value
      })
    )
  }

  handleAddUser(e: any) {
    e.preventDefault();
    axios.post("https://jsonplaceholder.typicode.com/todos", {
      username: this.username.current?.value,
      password: this.password.current?.value
    })
      .then(res => {
        this.setState(() => {
          return {
            username: res.data.username,
            password: res.data.password
          }
        })
      })
      .catch(err => {
        throw new Error(err);
      })
  }

  render() {
    return (
      <>
        <FormController>
          <p>{this.state.username}</p>
          <p>{this.state.password}</p>
          <Input ref={this.username} onChange={this.handleFormInput} name="username"/>
          <Input ref={this.password} onChange={this.handleFormInput} placeholder="Password" name="password"/>
          <button onClick={this.handleAddUser}>Add User</button>
        </FormController>
        <ul>
          {
            this.state.users.map(({title, id}) => {
              return (
                <li key={id}>{title}</li>
              )
            })
          }
        </ul>
      </>
    )
  }
}