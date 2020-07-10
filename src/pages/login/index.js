import React, {Component, Fragment} from "react"
import {Button} from "antd"
import {Link} from "react-router-dom"
import withStyles from 'isomorphic-style-loader/withStyles'
import {Helmet} from "react-helmet";
import {connect} from 'react-redux'

import styles from "./index.css"

const baiduAry = ['内蒙古发生命案致3死 嫌犯81岁', '韩国首尔市长生前最后监控曝光', '《绿色背景四裸女》2.58亿成交', '杜海涛代言翻车姐姐骂受害人活该', '车险综合改革来了', '男子捞鱼被拽进洪水冲走', '男子花18元买鸡蛋砸奔驰赔2万', '台湾五粮液哥称大陆将出现粮荒']


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

        <Button onClick={this.resetRouter}>redux更改数据</Button>

        <h1>redux的数据{routes.length}</h1>

        <ol>
          {
            baiduAry.map((item) => {
              return (
                <li key={item}>{item}</li>
              )
            })
          }
        </ol>
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