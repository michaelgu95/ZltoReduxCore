import React, { Component } from 'react'
import { Link } from 'react-router'
import functional from 'react-functional'
import Accordion from 'react-bootstrap'

export const Earn = (props) => (
  <Accordion style={{ margin: '0 auto' }} >
    {props.activities.map(activity => 
      <Panel header={`${activity.title} - ${activity.zlato_amount}`} eventKey="1">
        {activity.description}
        {activity.number_of_hours}
      </Panel>
    )}
  </Accordion>
)

Earn.componentWillMount = (props) => {
  //manually set userId until auth working
  const userId = 1
  props.fetchActivities(userId)
}

Earn.propTypes = {
  activities: React.PropTypes.array,
  fetchActivities: React.PropTypes.func.isRequired
}

export default functional(Earn)
