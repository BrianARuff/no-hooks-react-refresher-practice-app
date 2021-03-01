import * as React from "react";
import Form from "./components/Form";

export default class App extends React.Component<{ }, {}>{
  render() {
      return (
          <div className="App">
              <h1>No Hooks Refresher</h1>
              <Form />
          </div>
      );
  }
}
