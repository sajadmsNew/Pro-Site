

import Transition from '../components/transition'

import React from "react"
import PropTypes from "prop-types"
 
import styles from "./layout.module.scss";
try {
require("smooth-scroll")('a[href*="#"]')
} catch( Any ){
  
}

const Layout = ({ children, location  }) => {


  return (
    <>
   
      <div className={styles.wrapper}
       
      >
        <main> <Transition location={location}>
          {children}
        </Transition>
    </main>
      
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

