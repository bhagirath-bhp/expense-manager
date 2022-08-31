import React from 'react'
import { useState } from 'react';
import { activeUser } from '../../App';
import { firestore } from '../../FireBase/utils';
import InputBalance from '../Input-Balance';
import './styles.scss';
// import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css';

// export let gotBalance;
function BalancePager() {
  let [userBalance, setUserBalance] = useState(0);
  const [access, setAccess] = useState(false)
  const [edit, setEdit] = useState(null)
  firestore.collection(activeUser.uid).onSnapshot((snap)=>{
    let changes = snap.docChanges();
    // console.log(changes)
    changes.forEach(change => {
      if (change.doc.data().balance) {
        setUserBalance(change.doc.data().balance)
        console.log(change.doc.data().balance)
      }
    })
  })
  return (
    <>
      <div className='blcontainerfull container'>
        <span onClick={()=>{
          (access)?setAccess(false):setAccess(true);
          console.log(access);
          (access)?setEdit(<InputBalance/>):setEdit(null)}} className="editBalance">edit</span>
        <div className="blcontainer">
          <h3>Available Balance</h3>
          <p>{userBalance} <span>rs.</span></p>
        </div>
        {edit}
        <input id="balaninp" type="number" name="balanceinp"/>
      </div>
    </>
  )
}


export default BalancePager;