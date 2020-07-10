import React, {Fragment, useState} from "react"
import {Table} from "antd"
import {Link} from "react-router-dom"
import {Helmet} from 'react-helmet';
import useStyles from "isomorphic-style-loader/useStyles"
import {useFetch} from "@/hooks"

const styles = {
  _getCss() {
    return `.site-layout-background{
        background: #fff;
      }`
  },
  _insertCss() {
  }
}
const Index = () => {
  const [current, setCurrent] = useState(1)
  const [{data, isLoading}, setUrl] = useFetch('https://api.justcome.cn/shop/1115898732395761664/productOrders?offset=0&limit=20')
  useStyles(styles);

  const columns = [
    {
      title: '订单编号',
      dataIndex: 'order_id',
      width: 110,
      align: 'left',
    },
    {
      title: '商品名称',
      dataIndex: 'product',
      render(item) {
        return <a>{item.name}</a>
      }
    },
    {
      title: '用户账号',
      dataIndex: 'consignee_phone',
    },
    {
      title: '订单金额',
      dataIndex: 'amount',
    },
    {
      title: '提交时间',
      dataIndex: 'created_datetime',
    },
    {
      title: '操作',
      render: () => {
        return (
          <Link to="/menu/message">查看订单</Link>
        )
      }
    },
  ]

  const handleChange = async (current) => {
    setCurrent(current)
    const cur = current - 1
    setUrl(`https://api.justcome.cn/shop/1115898732395761664/productOrders?offset=${cur}&limit=20`)
  }

  return (
    <Fragment>
      <Helmet>
        <title>这是客户端渲染</title>
        <meta name="description" content="这里是禾口和react-ssr的调研"/>
      </Helmet>

      <Table
        locale={{emptyText: '暂无数据'}}
        rowKey="id"
        dataSource={data.data}
        columns={columns}
        loading={isLoading}
        pagination={{
          showTotal(total) {
            return `总共${total}条`
          },
          pageSize: 20,
          total: data.total,
          current,
          onChange: handleChange
        }}
      />
    </Fragment>
  )
}


export default Index