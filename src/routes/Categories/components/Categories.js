import React, { Component } from 'react'

export const Categories = (props) => (
  <div style={{ margin: '0 auto' }} >
    {props.categories.map( cat => <button className='btn btn-default'>{cat.name}</button>)}
 

    <button  onClick={props.fetchCategories}>
      Fetch Categories
    </button>
    {' '}
  </div>
)

// class Categories extends Component {
//   constructor(props) {
//     super(props);
//   }

//   componentWillMount() {
//     this.props.fetchCategories()
//   }

//   componentDidMount() {
//     console.log(this.props)
//   }

//   render() {
//     let categories = this.props.categories.length > 0 ? this.props.categories.map( cat => <h1>cat.name</h1>) : null
//     console.log(categories)
//     return (
//       <div>
//         {categories}
//       </div>

//     )
//   }
// }

// Categories.propTypes = {
//   categories: React.PropTypes.array,
//   fetchCategories: React.PropTypes.func.isRequired
// }

export default Categories
