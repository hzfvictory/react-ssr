import React, {Component, Fragment} from "react"
import {Button} from "antd"
import {Link} from "react-router-dom"
import withStyles from 'isomorphic-style-loader/withStyles'
import {Helmet} from "react-helmet";
import {connect} from 'react-redux'

import styles from "./index.css"

@withStyles(styles)
@connect(({menuTree}) => ({
  ...menuTree
}))
class Index extends Component {


  resetRouter = () => {
    const {dispatch, routes} = this.props;
    console.log(routes, 'login页面');
    dispatch({
      type: "menuTree/reset",
    });
  }

  componentDidMount() {
    console.log(1212);
  }

  render() {
    const {routes} = this.props;

    return (
      <Fragment>
        <Helmet>
          <title>这是login页</title>
          <meta name="description" content="这里是禾口和react-ssr的调研"/>
        </Helmet>

        <Link to={'/menu/home'}> 起始页 </Link>
        <br/>

        <Button onClick={this.resetRouter}>使劲点它</Button>

        <h1>redux的数据{routes.length}</h1>
        <ul>
          <li>1121212121212</li>
          <li>1121212121212</li>
          <li>1121212121212</li>
          <li>1121212121212</li>
          <li>1121212121212</li>
          <li>1121212121212</li>
          <li>1121212121212</li>
          <li>1121212121212</li>
        </ul>
      </Fragment>
    )
  }
}

Index.loadData = async (store) => {
  store.dispatch({
    type: "menuTree/reset",
  });
  console.log('我试试这个到底加载不');
}
export default Index