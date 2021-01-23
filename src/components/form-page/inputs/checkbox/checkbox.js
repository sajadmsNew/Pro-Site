import React from "react"
import styles from "./checkbox.module.scss"
import MaterialCheckbox from "@material-ui/core/Checkbox"

import FormGroup from "@material-ui/core/FormGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"

class Checkbox extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={styles.checkboxWrapper}>
        <FormGroup row>
          <FormControlLabel
            control={
              <MaterialCheckbox
                style={{ width: 36, height: 36 }}
                color={"default"}
                checked={this.props.isSelected === true}
                onChange={this.props.changeCheckbox}
                value="checkedA"
                label="ddd"
                inputProps={{
                  "aria-label": "primary checkbox",
                }}
              />
            }
            label={this.props.label}
          />
        </FormGroup>
      </div>
    )
  }
}

export default Checkbox
