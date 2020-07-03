import React, {Component, Fragment} from "react"
import {Button} from "antd"
import {Link} from "react-router-dom"
import withStyles from 'isomorphic-style-loader/withStyles'
import {Helmet} from "react-helmet";

import styles from "./index.css"

@withStyles(styles)
class Index extends Component {

  render() {
    return (
      <Fragment>

        <Helmet>
          <title>这是login页</title>
          <meta name="description" content="这里是禾口和react-ssr的调研"/>
        </Helmet>

        <Button>按钮</Button>
        <Link to={'/menu/home'}> 起始页 </Link>
        <h1 style={{color: 'red'}}>测试</h1>
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

export default Index