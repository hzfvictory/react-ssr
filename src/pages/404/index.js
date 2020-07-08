import React from 'react'
import {Result, Button} from 'antd';

const Index = (props) => {
  const jumpHome = () => {
    props.history.push("/menu/home")
  }
  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button onClick={jumpHome} type="primary">Back Home</Button>}
      />
    </div>
  )
}
export default Index