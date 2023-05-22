const Validate = (values) => {
    let errors = {};
  
    if (!values.email) {
      errors.email = "Email is required";
    } 
  
    if (!values.password) {
      errors.password = "Password is required";
    }
    //   else if (values.password.length < 6) {
    //     errors.password = "Password must be at least 6 characters";
    //   }
  
    return errors;
  };
  
  export default Validate;
  