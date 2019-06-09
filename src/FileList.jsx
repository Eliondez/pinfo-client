import React, { Component } from 'react';
import DragAndDrop from './DragAndDrop';
import 'antd/dist/antd.css';

class FileList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }

  handleResponse = (resp) => {
    resp.then((data) => {
      if (data.ok) {
        this.setState({users: data.data.map((item, i) => {
          return {key: i, name: item[0], surname: item[1]}
        })});
      }
    });
  }

  uploadFile = (file) => {
      let url = 'http://localhost:5000/upload/'
      let formData = new FormData()
      formData.append('file', file)
      fetch(url, {
        method: 'POST',
        body: formData
      })
      .then(response => this.handleResponse(response.json()))
      .catch(() => { /* Ошибка. Информируем пользователя */ })
    
  }

  handleDrop = (files) => {
    ([...files]).forEach(this.uploadFile);
  }

  

  render() {
    return (
      <div>
        <DragAndDrop handleDrop={this.handleDrop}>
          <div style={{height: "100vh", width: "100vw"}}>
            {this.state.users.map((user, i) =>
              <div key={i}>{user.name} {user.surname}</div>
            )}
          </div>
        </DragAndDrop>
      </div>
      
    )
  }
}

export default FileList