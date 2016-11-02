import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import Modal from 'boron/DropModal'
import { Link } from 'react-router'
import { validate, asyncValidate } from '../../routes/Auth/modules/validation'

const modalStyle = {
    width: 'inherit',
    height: 'inherit'
}

const renderField = ({ input, label, type, meta: { asyncValidating, touched, error } }) => (
  <div>
    <label>{label}</label>
    <div className={asyncValidating ? 'async-validating' : ''}>
      <input {...input} type={type} placeholder={label}/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

let LoginModal = ({ handleSubmit, pristine, reset, submitting }) => (
  <div modalStyle={modalStyle}>
    <h2>Please Login </h2>
    <form onSubmit={handleSubmit}>
      <div>
        <Field name='idNumber' component={renderField} type='text' className='form-control' maxlength='13' label='ID Number' placeholder='13 Digits no spaces'/>
      </div>
      <div>
        <Field name='password' component={renderField} type='password' className='form-control' label='Password' placeholder='Password'/>
      </div>
      <button type='submit' className='btn btn-primary' disabled={pristine || submitting}>Submit</button>
      <button type='button' className='btn btn-error' disabled={pristine || submitting} onClick={reset}>Cancel</button>
    </form>
  </div>   
)

LoginModal = reduxForm({
  form: 'login', // a unique name for this form
  validate,
  asyncValidate,
  asyncBlurFields: [ 'idNumber' ]
})(LoginModal)

export default LoginModal
 