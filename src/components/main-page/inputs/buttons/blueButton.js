import React from "react";
import { Link } from "gatsby";
import styles from "./blueButton.module.scss";

class BlueButton extends React.Component {
  render() {
    return (
      <Link className={styles.link} to={this.props.path}>
        {this.props.text}
      </Link>
    );
  }
}

export default BlueButton;
