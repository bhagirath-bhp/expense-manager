import React from 'react';
import { useState } from 'react';
import { activeUser } from '../../App';
import { firestore } from '../../FireBase/utils';
import { v4 as uuid } from 'uuid';
import './styles.scss';

export let jsTimestamp = new Date();
function NewTransaction() {
  const [style, setStyle] = useState(false)
  let [transObj, setTransObj] = useState(0);
  let [timeStamp, setTimestamp] = useState({tdate:0, tmonth:0, tyear:0, thours:0, tmins:0, tsecs:0})
  const usingStyles = {
    menu:{
      height: style ? '33rem' : '0rem',
      opacity: style ? '100%' : '50%',
      state: style ? '-' : '+'
    }
  }
  const onSubmit = (e) => {
    let getBalance;
    e.preventDefault();
    console.log([e.target[0].value, e.target[1].value]);
    console.log(firestore.collection(activeUser.uid));
    let thisTid = uuid();
    firestore.collection(activeUser.uid).doc("Balance").get().then(point => {
      getBalance = point.data().balance;
    })
    firestore.collection(activeUser.uid).doc("transactionPoint").get().then(point => {
      setTransObj(point.transactionPoint)
    }).then(
      firestore.collection(activeUser.uid).doc(thisTid).set({
        name: e.target[0].value,
        amount: e.target[1].value,
        mode: e.target[2].value,
        tid: thisTid,
        timeStamp: jsTimestamp,
        times:1
      }).then(
        firestore.collection(activeUser.uid).doc("transactionPoint").set({
          transactionPoint: transObj+1
        })).then(()=>{
          firestore.collection(activeUser.uid).doc("Balance").set({
            balance: Number(getBalance)-Number(e.target[1].value)
          })
          setTransObj(transObj+1)
          console.log("Transaction Created Successfully");
        })
      )
  };
  return (
    <div>
      <div className="createTransaction" style={usingStyles.menu}>
        <form name='creatingTransaction' action="" onSubmit={onSubmit}>
          <div className="transactionName">
            <p>Transaction Name: </p>
            <input name='transactionNameIs' type="text"/>
          </div>  
          <div className="transactionAmount">
            <p>Transaction Amount: </p>
            <input name='transactionAmountIs' type="number" />
          </div>
          <div className="transactionMode">
            <p>Transaction Mode: </p>
            <select name="transactionMode" id="transactionMode">
              {/* <option value="Select Mode" selected>Select Mode</option> */}
              <option value="UPI">UPI</option>
              <option value="Cash">Cash</option>
              <option value="Net Banking">Net Banking</option>
            </select>
          </div>
          <div className="transactionTiming">
            <div className="transactionDate">
              <p>Date:</p>
              <div className="transactionDate-day">{timeStamp.tdate}</div>
              <div className="transactionDate-month">{timeStamp.tmonth}</div>
              <div className="transactionDate-year">{[timeStamp.tyear]%2000}</div>
            </div>
            <div className="transaction-time">
              <p>Time: </p>
              <div className="transaction-time-hour">{timeStamp.thours}</div>
              <div className="transaction-time-minute">{timeStamp.tmins}</div>
              <div className="transaction-time-seconds">{timeStamp.tsecs}</div>
            </div>
          </div>
          <div className="submit-new-transaction">
            <input type="submit" value='Add Transaction' onClick={()=>{setStyle(false)}}/>
          </div>
        </form>
      </div>
      <button className="newTransaction" onClick={()=>{
        // console.log(js)
        setTimestamp({tdate:jsTimestamp.getDate(), tmonth:jsTimestamp.getMonth()+1, tyear:jsTimestamp.getFullYear(), thours:jsTimestamp.getHours(), tmins:jsTimestamp.getMinutes(), tsecs:jsTimestamp.getSeconds()})
        style ? setStyle(false) : setStyle (true)
        }}>
        {usingStyles.menu.state}
        </button>
    </div>
  )
}

export default NewTransaction
