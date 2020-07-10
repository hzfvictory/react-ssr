import React, {Fragment} from 'react'
import {Button} from "antd"
import useStyles from 'isomorphic-style-loader/useStyles'
import styles from "./index.less"


const Index = (props) => {
  useStyles(styles)
  const jumpHome = () => {
    props.history.push("/menu/home")
  }
  return (
    <Fragment>
      <div className={styles['he-exception']}>
        <div className={styles["he-exception-img"]}>
          <div className={styles["he-exception-img-element"]}/>
        </div>
        <div className={styles["he-exception-content"]}>
          <h1>404</h1>
          <div className={styles["he-exception-content-desc"]}>抱歉，你访问的页面不存在</div>
          <div className={styles["he-exception-content-actions"]}>
            <Button type="primary" onClick={jumpHome}>返回首页
            </Button>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
export default Index