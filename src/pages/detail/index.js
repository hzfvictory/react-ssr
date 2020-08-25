import React, {Fragment, useEffect} from "react"
import {Helmet} from 'react-helmet';
import {Descriptions, Tag, Image} from 'antd';
import {connect} from "react-redux"
import useStyles from 'isomorphic-style-loader/useStyles'
import pathToRegexp from "path-to-regexp"

import styles from "./index.less"

// const contentStyle = {
//   height: '160px',
//   width: '100%',
//   color: '#fff',
//   lineHeight: '160px',
//   textAlign: 'center',
//   background: '#364d79',
// };

const Index = (props) => {
  const {scenicDetail: {data}, dispatch, match: {params: {id}}} = props;

  useStyles(styles);

  useEffect(() => {
    window.scroll(0, 0);
    dispatch({
      type: "scenicDetail/loadData",
      id
    });
  }, [])

  return (
    <Fragment>
      <Helmet>
        <title>这是景区详情页</title>
        <meta name="description" content="这里是禾口和react-ssr的调研"/>
      </Helmet>

      {
        <Descriptions title="景区概况" layout="vertical">
          <Descriptions.Item label="景区名称"><Tag color="purple">{data.name}</Tag></Descriptions.Item>
          <Descriptions.Item label="景区标签">{data && data['tags'][0]}</Descriptions.Item>
          <Descriptions.Item label="景区开放时间">{data.open_time} - {data.close_time}</Descriptions.Item>
          <Descriptions.Item label="用时参考">{data.duration_text}</Descriptions.Item>
          <Descriptions.Item label="咨询电话">{data.tel} </Descriptions.Item>
          <Descriptions.Item label="景区地址">{data.address.detail_address}</Descriptions.Item>
          <Descriptions.Item label="交通攻略">{data.traffic}</Descriptions.Item>
          <Descriptions.Item label="温馨提示">{data.tips}</Descriptions.Item>
          <Descriptions.Item label="景区介绍">{data.description}</Descriptions.Item>
          <Descriptions.Item label="景区图片">
            {
              !!data.photos.length && data.photos.map((item) => {
                return (
                  <div key={item.key}>
                    <Image
                      style={{marginBottom: 10}}
                      width={200}
                      src={item.url}
                      alt={item.title}
                    />
                  </div>
                )
              })
            }

          </Descriptions.Item>
        </Descriptions>
      }
    </Fragment>
  )
}

Index.loadData = async (store, ctx) => {
  console.log(ctx, '详情页面数据');

  const re = pathToRegexp(ctx.route);
  const id = re.exec(ctx.url)[1];

  await store.dispatch({
    type: "scenicDetail/loadData",
    id
  });
}

export default connect(({scenicDetail, loading}) => ({scenicDetail, loading}))(Index)