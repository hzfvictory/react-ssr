import React from "react"
import {Layout, Menu, Breadcrumb, Dropdown} from 'antd';
import {MailOutlined, AppstoreOutlined, SettingOutlined, CaretDownOutlined, LogoutOutlined} from '@ant-design/icons';
import {renderRoutes} from 'react-router-config'
import {Link} from "react-router-dom";
import withStyles from 'isomorphic-style-loader/withStyles'

import styles from "./index.css"

const {Header, Content, Footer} = Layout;


@withStyles(styles)

class Layouts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      route: props.route.routes,
      current: props.location.pathname
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.current !== nextProps.location.pathname) {
      return {
        current: nextProps.location.pathname
      }
    }
    return null
  }

  // 跳转页面
  handleClick = e => {
    this.setState({
      current: e.key,
    });
    this.props.history.push(e.key)
  };

  // 获取当前路由信息
  curRoute = (type) => {
    const {route} = this.state;
    const {location: {pathname}} = this.props;
    const result = route.find((item) => item.path === pathname);
    return result[type]
  }

  onLogout = () => {
    this.props.history.push("/login")
  };

  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <Link to="/set">
            <SettingOutlined style={{marginRight: 8}}/>
            个人设置
          </Link>
        </Menu.Item>
        <Menu.Item onClick={this.onLogout}>
          <LogoutOutlined style={{marginRight: 8}}/>
          退出登录
        </Menu.Item>
      </Menu>
    );

    return (
      <Layout>
        <Header style={{position: 'fixed', zIndex: 1, width: '100%'}}>
          <div className={styles.logo}/>

          <span className={styles.userSet}>
             <Dropdown overlay={menu}>
                  <span className={styles['ant-dropdown-link']}>
                       <img alt="" className={styles['avatar']}
                            src={'data:image/png;base64,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'}/>
                  admin <CaretDownOutlined/>
                  </span>
            </Dropdown>
          </span>


          {/*顶部菜单栏*/}
          <Menu theme="dark" onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
            <Menu.Item key="/menu/home" icon={<MailOutlined/>}>
              首页
            </Menu.Item>
            <Menu.Item key="/menu/message" icon={<AppstoreOutlined/>}>
              Message
            </Menu.Item>
            <Menu.Item key="/menu2/home" icon={<SettingOutlined/>}>
              菜单2
            </Menu.Item>
            <Menu.Item key="/login" icon={<SettingOutlined/>}>
              login
            </Menu.Item>
          </Menu>
        </Header>

        {/*内容区域*/}
        <Content className={styles["site-layout"]} style={{padding: '0 50px', marginTop: 64}}>
          {/*面包屑*/}
          <Breadcrumb style={{margin: '16px 0'}}>
            <Breadcrumb.Item href={"/menu/home"}>首页</Breadcrumb.Item>
            <Breadcrumb.Item>{this.curRoute('f_title')}</Breadcrumb.Item>
            <Breadcrumb.Item>{this.curRoute('title')}</Breadcrumb.Item>
          </Breadcrumb>
          {/*操作展示区域*/}
          <div className={styles["site-layout-background"]} style={{padding: 24, minHeight: 380}}>
            {renderRoutes(this.state.route)}
          </div>
        </Content>

        {/*底部*/}
        <Footer style={{textAlign: 'center'}}>xxxx-xxxxx-菜单1</Footer>
      </Layout>
    );
  }
}

export default Layouts