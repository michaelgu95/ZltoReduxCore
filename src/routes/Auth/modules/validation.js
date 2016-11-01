export const validate = values => {
  const errors = {}
  if (!values.idNumber) {
    errors.username = 'Required'
  }
  if (!values.password) {
    errors.password = 'Required'
  }
  return errors
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export const asyncValidate = (values/*, dispatch */) => {
  return sleep(1000) // simulate server latency
    .then(() => {
      if ([ '0000000000000 ', '1111111111111', '2222222222222'].includes(values.idNumber)) {
        throw { idNumber: 'That idNumber is taken' }
      }
    })
}