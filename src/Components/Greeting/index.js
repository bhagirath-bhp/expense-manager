import React from 'react'
// import { useState } from 'react'
import { activeUser } from '../../App'
import { jsTimestamp } from '../NewTransaction';
import './styles.scss'

const currentHour = jsTimestamp.getHours()+1;
function Greeting() {
  let greet;
  if(currentHour>12 && currentHour<=16){
    greet = 'afternoon';
  }
  else if(currentHour>16 && currentHour<=20){
    greet = 'evening';
  }
  else if(currentHour>0 && currentHour<=4){
    greet = 'night';
  }
  else if(currentHour>20 && currentHour<=24){
    greet = 'night';
  }
  else{
    greet = 'morning';
  }
  return (
    <>
        <div className="greeting-container">
            <h5>Hello {activeUser.displayName} &nbsp;</h5>
            <h3>Good {greet}</h3>
        </div>
    </>
  )
}

export default Greeting