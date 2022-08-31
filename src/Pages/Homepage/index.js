import React from 'react'
import AnalyticsPager from '../../Components/Analytics-pager';
import BalancePager from '../../Components/Balance-pager';
import Header from '../../Components/Header';
import Greeting from '../../Components/Greeting';
import './styles.scss'
import NewTransaction from '../../Components/NewTransaction';
import { seeAllTrans, TransactionCollection } from '../../Components/Transactions';

function Homepage() {
  return (
    <>
      <Header/>
      <div className="homepage-content">
        <Greeting/>
        <BalancePager/>
        {/* <ApexCharts/> */}
        <AnalyticsPager/>
        <div className="transactions-header">
          <h3>Recent Activity</h3>
          <button className='seeAllTrans' onClick={seeAllTrans}>see all</button>
        </div>
        <TransactionCollection/>
        <NewTransaction/>
      </div>
    </>
  )
}

export default Homepage