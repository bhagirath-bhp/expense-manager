import React from 'react'
import './styles.scss'
import Chart from 'react-apexcharts'
import { activeUser } from '../../App'
import { firestore } from '../../FireBase/utils'
// import { useState } from 'react'
// import '../Balance-pager/styles.scss'


class AnalyticsPager extends React.Component
{
  constructor(props){
    super(props);
    this.state = {
      sampData: [0],
      sampCats: [0],
      series: [{
        data: []
      }],
      options: {
        chart: {
          height: 'auto',
          type: 'area',
          events: {
            mounted: (chart) => {
              chart.windowResizeHandler();
            }
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          type: 'datetime',
          categories: [],
        },
        tooltip: {
          theme: "dark",
          x: {
            format: 'dd/MM/yy HH:mm'
          },
        },
      },
    }
    // console.log(this.state.series[0].data);
  }
  async componentDidMount(){
    console.log('hi');
    await firestore.collection(activeUser.uid).get().then(snapshot => { 
      for(let doc of snapshot.docs){
          if(doc.data().tid && doc.data().times!==0){
            this.state.series[0].data.push(Number(doc.data().amount))
            this.state.options.xaxis.categories.push(doc.data().timeStamp.toMillis())
          }
      }      
      // console.log(this.state.options.xaxis.categories);
    }).catch(err => {
        console.error(err);
    })
  }

  render(){
    return(
      <>
        <div className="analcontainer container">
          <Chart options={this.state.options} series={this.state.series} type="area" height={150} width={440}/>
        </div>
      </>
    )
  }
}
// function AnalyticsPager() {
//   async function getData(){
//     await firestore.collection(activeUser.uid).get().then(snapshot => { 
//       for(let doc of snapshot.docs){
//           // console.log(doc.data());
//           if(doc.data().tid){
             
//               // console.log("successful");
//           }
//       }      
//     }).catch(err => {
//         console.log(err);
//     })
//   }
//   const series = [{
//     name: 'series1',
//     data: [31, 40, 28, 51, 42, 109, 100]
//   }]
//   const options = {
//     chart: {
//       height: 150,
//       width: 300,
//       type: 'area'
//     },
//     dataLabels: {
//       enabled: false
//     },
//     stroke: {
//       curve: 'smooth'
//     },
//     xaxis: {
//       type: 'datetime',
//       categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
//     },
//     tooltip: {
//       theme: "dark",
//       x: {
//         format: 'dd/MM/yy HH:mm'
//       },
//     },
//   }
//   return (
//     <>
//       <div className="analcontainer container">
//         <Chart options={options} series={series} type="area" height={150} width={440}/>
//       </div>
//     </>
//   )
// }

export default AnalyticsPager