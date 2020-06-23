import React from "react"
import {Layout, Menu, Breadcrumb} from 'antd';
import {MailOutlined, AppstoreOutlined} from '@ant-design/icons';
import {renderRoutes} from 'react-router-config'

const {Header, Content, Footer} = Layout;

class Layouts extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      route: props.route.routes,
      current: props.location.pathname
    }
  }

  handleClick = e => {
    this.setState({
      current: e.key,
    });
    this.props.history.push(e.key)
  };

  render() {
    return (
      <Layout>
        <Header style={{position: 'fixed', zIndex: 1, width: '100%'}}>
          <Menu theme="dark" onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
            <Menu.Item key="/menu2/home" icon={<MailOutlined/>}>
              首页
            </Menu.Item>
            <Menu.Item key="/menu2/message" icon={<AppstoreOutlined/>}>
              Message
            </Menu.Item>
            <Menu.Item key="/menu/home" icon={<AppstoreOutlined/>}>
              菜单1
            </Menu.Item>
          </Menu>
        </Header>

        <Content className="site-layout" style={{padding: '0 50px', marginTop: 64}}>
          <Breadcrumb style={{margin: '16px 0'}}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{padding: 24, minHeight: 380}}>
            {renderRoutes(this.state.route)}
          </div>
        </Content>

        <Footer style={{textAlign: 'center'}}>xxxx-xxxxx-菜单2</Footer>
      </Layout>
    );
  }
}

export default Layouts
