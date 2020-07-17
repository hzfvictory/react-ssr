import React, {Fragment, useState} from "react"
import {ImageLoad} from "@/components";

import Scenic from "@/assets/images/img.jpeg"

import styles from "./index.less"

const Index = () => {
  const [wait, setWait] = useState(false)

  const handleState = () => {
    setWait(true);
  }

  return (
    <Fragment>
      <h1 className={styles['title-center']} style={{color: 'red'}}>message1</h1>
      <h1 className={'title-center'} style={{color: 'red'}}>message2</h1>


      <ImageLoad imgProps={{src: Scenic}}>
        <img src={Scenic} alt="1234567890"/>
      </ImageLoad>

      <br/>

      <ImageLoad imgProps={{src: Scenic, alt: '主页第一张', width: '60%'}}/>
      <ImageLoad imgProps={{src: Scenic}} waiting={wait} callback={handleState}>
        <div>
          <h3 style={{margin: '30px 0', textAlign: 'center'}}>标题会一起延迟加载</h3>
          <img src={Scenic} alt="主页第二张" width="100%"/>
        </div>
      </ImageLoad>
    </Fragment>
  )
}

export default Index
