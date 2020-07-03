import React, {Fragment, useState, useEffect} from "react"
import {Table, Avatar} from "antd"
import {Link} from "react-router-dom"
import {Helmet} from 'react-helmet';
import {useFetch} from "@/hooks"
import useStyles from 'isomorphic-style-loader/useStyles'
import styles from "./index.css"


const Index = (props) => {
  const [current, setCurrent] = useState(1)
  const [{data, isLoading}, setUrl] = useFetch('https://api.justcome.cn/admin/1068068178288054272/scenics?offset=0&limit=10&includeShop=true', {})

  useStyles(styles)


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
      render: (text) => {
        return <a>{text}</a>
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
      render: () => {
        return (
          <Link to="/menu/message">编辑</Link>
        )
      }
    },
  ]
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(selectedRowKeys, selectedRows);
    }
  };
  const handleChange = (current) => {
    setCurrent(current)
    const cur = current - 1
    setUrl(`https://api.justcome.cn/admin/1068068178288054272/scenics?offset=${cur}&limit=10&includeShop=true`)
  }

  return (
    <Fragment>
      <Helmet>
        <title>这是home页</title>
        <meta name="description" content="这里是禾口和react-ssr的调研"/>
      </Helmet>

      <h1 className={styles.hhh}>测1试</h1>
      <h1 style={{color: 'red'}}>测11112试</h1>
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
      <Table rowSelection={rowSelection}
             locale={{emptyText: '暂无数据'}}
             rowKey="id"
             dataSource={data.data}
             columns={columns}
             loading={isLoading}
             pagination={{
               showTotal(total) {
                 return `总共${total}条`
               },
               pageSize: 10,
               total: data.total,
               current,
               onChange: handleChange
             }}
      />
    </Fragment>
  )
}


export default Index