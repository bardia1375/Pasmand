import React, { useState } from 'react'
import { TitleCard } from './TrafficModalTest2'
import MapComponent from 'routes/Home/MainBody/Dashboard/MapComponent'
import { Field } from 'components/common/Field'
import { Button } from 'components/common'
import Card from 'components/common/Card'
import { ConfigureButton } from 'assets/styles/layout/Calendar'
import { useEffect } from 'react'

function DetailAddress({setShowMap}) {
    const savedLatitude=localStorage.getItem("savedLatitude")
    const savedLongitude=localStorage.getItem("savedLongitude")
    const [detail,setDetail]=useState([])
    // useEffect(()=>{
    //   setDetail([savedLatitude,savedLongitude])
    //   console.log("detail",detail);

    // },[savedLatitude,savedLongitude])
  return (
    <Card color={"#f1f1f1"}>
    <div style={{display:"flex",flexDirection:"column",justifyContent:"space-between",alignItems:"center",height:"100%"}}> 
    <div style={{width:"100%",position:"relative",borderRadius:"16px",overflow:"hidden"}}>
        <MapComponent Search={false}  setShowMap={setShowMap} detail={detail}/>
        <Button radius="0" display="flex" style={{position:"absolute",bottom:"0",right:0,left:0,zIndex:"1000000"}} onClick={()=>setShowMap(1)}>ویرایش لوکیشن</Button>
        </div>   
        <div style={{width:"100%", display:"flex",flexDirection:"column",gap:"8px"}}>
            <Field noMargin type={"text"}  label={"نشانی"} width={"100%"}></Field>
            <Field noMargin type={"text"}  label={"جزییات "} placeHolder={"مثال: پلاک۳ -واحد۴"}></Field>
            <Field noMargin type={"text"}  label={"عنوان آدرس"} placeHolder={"مثال: خانه"}></Field>
            <Field noMargin type={"text"}  label={"شماره تماس (اختیاری)"}></Field>
     </div>
        <div style={{width:"100%",margin:"8px 0"}}>
        <Button width="100%" padding="4px 0" display="flex">تایید و ساخت آدرس</Button></div>
    </div></Card>
  )
}

export default DetailAddress