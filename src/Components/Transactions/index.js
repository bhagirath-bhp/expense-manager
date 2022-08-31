import React from 'react'
import { firestore } from '../../FireBase/utils'
import {activeUser} from '../../App'
import './styles.scss'
import { useState } from 'react'


export function seeAllTrans(){
    this.style.height= 'auto'
    console.log('done dana done done');
}
function ATransaction(props){
    const [sampTimes, setSampTimes] = useState(props.times)
    return(
        <>
        <div className='transactions-list' key={props.index}>
            <div className="transaction-info">
                <div className="transaction-logo"></div>
                <div className="transaction-details">
                    <h3>{props.name}</h3>
                    <p>{props.date}<span>{"₹"+props.amount}</span></p>
                </div>
            </div>
            <div className="reTransact">
                <button onClick={async ()=>{
                    await firestore.collection(activeUser.uid).doc(props.tid).set({
                        name: props.name,
                        amount: props.amount,
                        mode: props.mode,
                        tid: props.tid,
                        timeStamp: props.timeStamp,
                        times: sampTimes+1
                    })
                    setSampTimes(sampTimes+1)
                    // props.times++
                    console.log("increment")
                    }} className="AddTransact">+</button>
                <h3>{sampTimes}</h3>
                <button onClick={async ()=>{
                    await firestore.collection(activeUser.uid).doc(props.tid).set({
                        name: props.name,
                        amount: props.amount,
                        mode: props.mode,
                        tid: props.tid,
                        timeStamp: props.timeStamp,
                        times: sampTimes-1
                    })
                    setSampTimes(sampTimes-1)
                    // props.times++
                    }} className="SubtractTransact">-</button>
            </div>
            <div className="transaction-amount">
                <b>{"₹"+sampTimes*props.amount}</b>
            </div>
        </div>
        </>
    )
}
export class TransactionCollection extends React.Component
{
    constructor(){
        // console.log('constructor');
        super()
        this.state = {
            transactionArray: [],
            index: 0
        }     
    }
    async componentDidMount(){
        // console.log('component did mount');
        await firestore.collection(activeUser.uid).get().then(snapshot => { 
            for(let doc of snapshot.docs){
                if(doc.data().tid){
                    this.state.transactionArray.push({index: this.state.index, name:doc.data().name, amount:doc.data().amount, tid:doc.data().tid, times:doc.data().times, mode:doc.data().mode, timeStamp:doc.data().timeStamp})
                    // console.log(this.state.transactionArray)
                    this.state.index++;
                    this.setState({index: doc.data().transactionPoint})
                    // console.log("successful");
                }
            }      
        }).catch(err => {
            console.log(err);
        })
    }
    render(){
        const transactionElementsArray = this.state.transactionArray.map(item => (
            <ATransaction key={item.index} name={item.name} date={item.date} amount={item.amount} times={item.times} tid={item.tid} mode={item.mode} timeStamp={item.timeStamp}/>
        ))
        return(
            <div className='allTransactions'>
            {transactionElementsArray}
            </div>
        )
    }
}
