import React, { useState } from "react";
import { useFormik } from "formik";
import { Button, Snackbar, TextField } from "@material-ui/core";
import styles from "./styles/signupStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useHistory } from "react-router-dom";
import MuiAlert from "@material-ui/lab/Alert";
import Typography from "@material-ui/core/Typography";
import { signup } from "../../helpers/signupService";

function Alert(props) {
  return <MuiAlert variant="filled" {...props} />;
}

export default () => {
  const classes = styles();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [showError, setShowError] = useState('');

  const handleClick = () => {
    setOpen(!open);
  };

  const errorMessage = () => {
    if (showError) {
      return (
        <Typography variant="body1" color="error" className={classes.failureText}>
          {showError}
        </Typography>
      )
    }
  };

  const handleSignup = async (user_name,full_name, email, contact_number, password, confirm_password, resetForm) => {

    try {
      await signup(user_name,full_name, email, contact_number, password, confirm_password);
      setShowError('');
      handleClick();
      resetForm({ values: '' })
      setTimeout(() => { history.push("/login"); }, 1000)
      open = true
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setShowError(err.response.data);
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      user_name: "",
      full_name: "",
      email: "",
      contact_number: "",
      password: "",
      confirm_password: ""
    },

    validate: () => {

      const errors = {};
      const uppercaseRegExp = /(?=.*?[A-Z])/;
      const lowercaseRegExp = /(?=.*?[a-z])/;
      const digitsRegExp = /(?=.*?[0-9])/;
      const specialCharRegExp = /(?=.*?[!@#$%^&*])/;
      const minLengthRegExp = /.{8,64}/;


      if (!formik.values.user_name || (/^\s*$/.test(formik.values.user_name))) {
        errors.user_name = "Please enter username"
      }
      else if (!(/^[A-Za-z]{3,}[@_]+[0-9]+$/).test(formik.values.user_name)) {
        errors.user_name = "Please enter a valid user name (eg: name@123)"
      }
      else if (formik.values.user_name.length < 3) {
        errors.user_name = "Minimum length of username must be 3"
      }
      if (!formik.values.full_name)
        errors.full_name = "Please enter name"
      else if (!(/^[a-zA-Z ]*$/.test(formik.values.full_name)) || formik.values.full_name.length < 3 || (/^\s*$/.test(formik.values.full_name))) {
        errors.full_name = "Please enter valid name"
      }
      if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formik.values.email))) {
        errors.email = "Please enter valid email id";
      }
      if (!minLengthRegExp.test(formik.values.password) || !uppercaseRegExp.test(formik.values.password)
        || !digitsRegExp.test(formik.values.password) || !specialCharRegExp.test(formik.values.password)
        || !lowercaseRegExp.test(formik.values.password)) {
        errors.password = "The password must contain at least- 5 letters, 1 capital letter, 1 small letter, 1 special character( @!#$%&), and 1 number"
      }
      if (!((/^[6-9]\d{9}$/gi)).test(formik.values.contact_number)) {
        errors.contact_number = "Please enter valid contact number "
      }
      if (formik.values.confirm_password !== formik.values.password) {
        errors.confirm_password = "password did not match";
      }
      return errors;
    },
    onSubmit: () => {
      handleSignup(formik.values.user_name,formik.values.full_name, formik.values.email, formik.values.contact_number, formik.values.password, formik.values.confirm_password, formik.resetForm);
    },
  });

  return (

    <div className={classes.signupContainer}>
      <form className={classes.signupForm} onSubmit={formik.handleSubmit}>
        <h1 className={classes.title}><center>Signup</center></h1>

        <TextField
          name="user_name"
          value={formik.values.user_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={classes.content}
          required="true"
          label="User Name"
          variant="standard"
        />
        {formik.touched.user_name && formik.errors.user_name ? <div className={classes.failureText}>{formik.errors.user_name}</div> : <div>example: name@123</div>}

        <TextField
          name="full_name"
          value={formik.values.full_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={classes.content}
          required="true"
          label="Full Name"
          variant="standard"
        />
        {formik.touched.full_name && formik.errors.full_name ? <div className={classes.failureText}>{formik.errors.full_name}</div> : null}

        <TextField
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={classes.content}
          required="true"
          label="Email id"
          id ="email"
          variant="standard"
        />
        {formik.touched.email && formik.errors.email ? <div className={classes.failureText}>{formik.errors.email}</div> : null}

        <TextField
          name="contact_number"
          value={formik.values.contact_number}
          type="tel"
          onChange={formik.handleChange}
          InputProps={{
            startAdornment: <InputAdornment position="start">
              +91
            </InputAdornment>,
          }}
          onBlur={formik.handleBlur}
          className={classes.content}
          required="true"
          label="Contact Number"
          variant="standard"
        />

        {formik.touched.contact_number && formik.errors.contact_number ? <div className={classes.failureText}>{formik.errors.contact_number}</div> : null}

        <TextField
          name="password"
          placeholder="Enter password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={classes.content}
          required="true"
          label="Password"
          variant="standard"
        />

        {formik.touched.password && formik.errors.password ? <div className={classes.failureText}>{formik.errors.password}</div> : null}

        <TextField
          name="confirm_password"
          placeholder="Enter password"
          type="password"
          value={formik.values.confirm_password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={classes.content}
          required="true"
          label="Confirm Password"
          variant="standard"
        />
        {formik.touched.confirm_password && formik.errors.confirm_password ? <div className={classes.failureText}> {formik.errors.confirm_password}</div> : null}
        <center>{
          errorMessage()
        }</center>
        <div><Button type="submit"
          variant="contained"
          color="primary"
          value="Submit"
          className={classes.button}
        >
          Submit
        </Button></div>
        <Snackbar open={open}>
          <Alert severity="success">Signed Up Successfully!!!</Alert>
        </Snackbar>
      </form>
    </div>
  );
};
