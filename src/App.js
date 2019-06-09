import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Menu, Icon } from 'antd';
import menuItems from './MenuItems';
import HomeView from './HomeView'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Card from './Card';
const { SubMenu }  = Menu;

function About() {
  return <h2>About</h2>;
}

class App extends React.Component {
  state = {
    current: 'main',
  };

  handleClick = e => {
    this.setState({
      current: e.key,
    });
  };

  render() {
    let menus = menuItems.map((o) => {
      if (o.type === "main") {
        return (
          <Menu.Item key={o.key}>
            <Link to={o.url}>
              {o.name}
            </Link>
          </Menu.Item>
        )
      } else {
        return (
          <SubMenu
            title={
              <span className="submenu-title-wrapper">
                {o.name}
              </span>
            }
          > {o.children.map((c) => <Menu.Item key={c.key}><Link to={c.url}>{c.name}</Link></Menu.Item>)}
          </SubMenu>
        )
      }

    });
  return (
    <Router>
      <div id="menu1-row">
        <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
          {menus}
        </Menu>
        <div style={{flexGrow: 1}}></div>
        <div id="tel">
          <Icon type="phone" />
          +7 (495) 925-925-7
        </div>
        <div id="e-mail">
          <Icon type="mail" />
          main@sky-fort.com
        </div>
      </div>
      
      <div id="menu2-row">
        <div id={"logo-cont"}></div>
        <div id={'submenu-items'}>
          <div><b>Проверки персонала</b></div>
          <div>Проверки партнёров</div>
          <div>Розыск активов</div>
          <div>Расследование хищений</div>
          <div>Профайлинг и верификация</div>
          <div>Аудит и Аутсорсинг безопасности</div>
        </div>
      </div>
      <div id="banner">
        <span>Ваша безопасность - наша работа!</span>
      </div>
      <div id="content">
        <div style={{height: "600px", padding: "15px"}}>
          <div className="cards-container">
            <Card data={{price: "1500р.", desc: "Короткое описание базовой проверки", hr: 0, header: "Базовая проверка"}}/>
            <Card data={{price: "от 5000р.", desc: "Короткое описание расширенной проверки", hr: 90, header: "Расширенная проверка"}}/>
            <Card data={{price: "от 5000р.", desc: "Короткое описание собеседования", hr: 180, header: "Собеседование"}}/>
            <Card data={{price: "от 10000р.", desc: "Короткое описание проверки на полиграфе", hr: 270, header: "Полиграф"}}/>
          </div>
        </div>
      </div>
    </Router>
    );
  }
}

export default App;