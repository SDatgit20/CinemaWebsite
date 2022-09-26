import React from "react";
import styles from "../feature-toggle/PageNotFoundStyles";
const PageNotFound=()=>{
    const classes = styles();
    return(
    <section  className={classes.page404}>
  <div  className={classes.container}>
    <div  className={classes.row}>
    <div >
    <div  >
    <div  className={classes.fourZeroFourBg}>
      <h1 className={classes.message}>404</h1>
      <h3  className={classes.otherText}>
    Page Not Found
    </h3>
    </div>
    <div  className={classes.contantBox404}>
    <a href="/"  className={classes.link404}>Go to Home</a>
  </div>
    </div>
    </div>
    </div>
  </div>
</section>)
}

export default PageNotFound;