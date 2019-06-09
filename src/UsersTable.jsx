import React, { Component } from 'react';
import DragAndDrop from './DragAndDrop';
import { Table, Button } from 'antd';
import 'antd/dist/antd.css';

let currentKey = 0;

class UsersTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      columns: [
        {
          title: 'Фамилия',
          dataIndex: 'surname',
          key: 'surname'
        },
        {
          title: 'Имя',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Отчество',
          dataIndex: 'name2',
          key: 'name2',
        },
        {
          title: '',
          dataIndex: '',
          key: 'x',
          render: (text, record) => <b><a onClick={() => this.handleDel(record)} href="javascript:;">Удалить</a></b>,
        },
      ]
    }
  }

  handleResponse = (resp) => {
    resp.then((data) => {
      if (data.ok) {
        let last_data = [...this.state.data];
        data.data.forEach((item, i) => {
          last_data.push({key: currentKey, name: item[0], surname: item[1], name2: item[2]});
          currentKey += 1;
        });
        this.setState({data: last_data});
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


  handleDel = (e) => {
    const data = [...this.state.data];
    this.setState({ data: data.filter(item => item.key !== e.key) });
  }

  render() {
    let {columns, data} = this.state;
    return (
      <DragAndDrop handleDrop={this.handleDrop}>
        <div style={{width: "100%"}}>
          <Table
          pagination={false}
          title={() => 'Перетащите файл на таблицу'}
          columns={columns}
          dataSource={data} />
          {data.length > 0 && <Button style={{marginTop: "10px"}}>Сделать что-то с данными</Button>}
        </div>
      </DragAndDrop>
    )
  }
}


export default UsersTable