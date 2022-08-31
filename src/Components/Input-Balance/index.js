import React from 'react';
import swal from 'sweetalert';
import { activeUser } from '../../App';
import { firestore } from '../../FireBase/utils';
// import { gotBalance } from '../Balance-pager';

import './styles.scss'

function InputBalance() {
    swal("Enter balance here:", {
        content: "input",
      })
      .then((value) => {
        console.log(isNaN(value))
        if (isNaN(value)===false) {
          firestore.collection(activeUser.uid).doc("Balance").set({
            balance: Number(value)
          })
          swal(`Balance: ${value}`);
        }
        else {
          swal("Invalid Input");
        }
      });
  return (
    <div></div>
  )
}

export default InputBalance