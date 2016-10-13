import React, { Component } from 'react'
import { Link } from 'react-router';
import functional from 'react-functional'
import {Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis} from 'recharts'

// const { details } = {
//   "status": "error",
//   "details": [{
//     "id": 1,
//     "name": "Community",
//     "total": 140
//   }, {
//     "id": 2,
//     "name": "Economic Opportunities",
//     "total": 20
//   }, {
//     "id": 3,
//     "name": "Environmental",
//     "total": 40
//   }, {
//     "id": 4,
//     "name": "Health",
//     "total": 77
//   }, {
//     "id": 5,
//     "name": "NGO\'s",
//     "total": 34
//   }, {
//     "id": 6,
//     "name": "Opportunities Taken",
//     "total": 4
//   }, {
//     "id": 7,
//     "name": "Personal Development Training",
//     "total": 90
//   }, {
//     "id": 8,
//     "name": "School",
//     "total": 43
//   },{
//     "id": 9,
//     "name": "Skills Training",
//     "total": 43
//   }]
// },
function mapRadarData(details){
  console.log('details: ', details)
  return details.map(function(d){
    return {subject: d.name, count: d.total, fullMark: 150}
  })
}

export const Impact = (props) => (
  <RadarChart style={{ margin: '0 auto' }} cx={250} cy={250} outerRadius={200} width={600} height={500} data={mapRadarData(props.impact)} >
    <Radar name="Mike" dataKey="count" stroke="#8884d8" fill="#8884d8" fillOpacity={0.2}/>
    <PolarGrid />
    <PolarAngleAxis dataKey="subject" />
    <PolarRadiusAxis/>
  </RadarChart >
)

Impact.componentWillMount = (props) => {
  props.fetchImpact()
}

Impact.propTypes = {
  impact: React.PropTypes.array,
  fetchImpact: React.PropTypes.func.isRequired
}

export default functional(Impact)
