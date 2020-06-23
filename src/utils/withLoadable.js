import React from 'react'
import Loadable from 'react-loadable';
import {Spin, Alert} from 'antd';


// 水平垂直居中
const centerMiddle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
}

const MyLoadingComponent = ({isLoading, error}) => {
  if (isLoading) {
    return (
      <div style={centerMiddle}>
        <Spin size="large"/>
      </div>
    );
  } else if (error) {
    return (
      <Spin tip="出现不明错误！">
        <Alert
          message="页面加载失败！"
          description="给您带来不便，请刷新重试！"
          type="info"
        />
      </Spin>
    );
  } else {
    return null;
  }
};

const withLoadable = (comp) => {
  return Loadable({
    loader: comp,
    loading: MyLoadingComponent
  })
};
export default withLoadable;
