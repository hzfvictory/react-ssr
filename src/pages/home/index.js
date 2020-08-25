import React, {Fragment, useState, useEffect} from "react"
import {Table, Avatar} from "antd"
import {Link} from "react-router-dom"
import {Helmet} from 'react-helmet';
import {connect} from "react-redux"
import useStyles from 'isomorphic-style-loader/useStyles'
import cookie from 'js-cookie';
import qs from "querystring"

import styles from "./index.less"

const Index = (props) => {
  const {menuHome, dispatch, loading: {effects}} = props;
  const [current, setCurrent] = useState(1)
  useStyles(styles)

  useEffect(() => {
    window.scroll(0, 0);
    const {dispatch} = props;
    dispatch({
      type: "menuHome/getData",
      url: 'offset=0&limit=10&includeShop=true',
    });
  }, []);

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      width: 50,
      align: 'left',
    },
    {
      title: '名称',
      dataIndex: 'name',
      render: (text, record) => {
        return <Link to={`/menu/scenicid/detail/${record.id}`}>{text}</Link>
      }
    },
    {
      title: '图片',
      dataIndex: 'cover',
      render: (text) => {
        return <Avatar size={40} src={text}/>
      }
    },
    {
      title: '时间',
      dataIndex: 'created_date',
    },
    {
      title: '状态',
      dataIndex: 'status',
    },
    {
      title: '操作',
      render: (record) => {
        return (
          <Link to={`/menu/scenicid/detail/${record.id}`}>编辑</Link>
        )
      }
    },
  ]
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(selectedRowKeys, selectedRows);
    }
  };
  const handleChange = async (current) => {
    setCurrent(current)
    const cur = (current - 1) * 10

    dispatch({
      type: "menuHome/getData",
      url: `offset=${cur}&limit=10&includeShop=true`
    });
  };

  const handleClick = () => {
    const expires = {expires: 1};
    cookie.set('token', '添加cookie', expires);
    console.log(cookie.get('token'));
  }

  return (
    <Fragment>
      <Helmet>
        <title>这是home页</title>
        <meta name="description" content="这里是禾口和react-ssr的调研"/>
      </Helmet>

      <Table rowSelection={rowSelection}
             locale={{emptyText: '暂无数据'}}
             rowKey="id"
             dataSource={menuHome.data}
             columns={columns}
             loading={effects['menuHome/getData']}
             pagination={{
               showTotal(total) {
                 return `总共${total}条`
               },
               pageSize: 10,
               total: menuHome.total,
               current,
               onChange: handleChange
             }}
      />

      <h1 className={styles.homeTitlt}>默认为加载页 SEO中心 数据优先加载</h1>
      <h1 style={{color: 'red'}} onClick={handleClick}>添加cookie</h1>
      <ul>
        <li>9999999999</li>
        <li>1121212121212</li>
        <li>1212121</li>
        <li>1121212121212</li>
        <li>1121212121212</li>
        <li>1121212121212</li>
        <li>1121212121212</li>
        <li>1121212121212</li>
        <li>1121212121212</li>
        <li>1212121</li>
        <li>1121212121212</li>
        <li>1121212121212</li>
      </ul>
    </Fragment>
  )
}

Index.loadData = async (store, ctx) => {
  console.log(ctx, '首页数据啊啊');
  let url = ctx.url.split('?')[1]
  const {limit = 10} = qs.parse(url);

  await store.dispatch({
    type: "menuHome/getData",
    url: `offset=0&limit=${limit}&includeShop=true`,
  });
}

export default connect(({menuHome, loading}) => ({menuHome, loading}))(Index)