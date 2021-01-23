import React from "react";
import { withNamespaces } from "react-i18next";
import styles from "./tag.module.scss";

class Tag extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listOfTags: "",
    };

    this.selected = this.selected.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.selectedTags) {
      return {
        listOfTags: props.selectedTags,
      };
    }
    return null;
  }

  selected(event) {
    var arr = this.state.listOfTags.split(",");
    var elementClicked = event.currentTarget.dataset.label;

    if (arr.indexOf(elementClicked) >= 0) {
      arr.splice(arr.indexOf(elementClicked), 1);
    } else {
      arr.push(elementClicked);
    }
    arr = arr.join(",");
    this.setState({ listOfTags: arr });
    if (this.props.selectedCallback) {
      this.props.selectedCallback(arr);
    }
  }

  render() {
    const { t } = this.props;

    return (
      <div>
        <div className={styles.tagsGroup}>
          {this.props.arrTags.map(val => {
            return (
              <div
                id={val}
                className={`${styles.tagButton} ${
                  this.state.listOfTags.includes(val) ? styles.active : null
                }`}
                onClick={this.selected}
                data-label={val}
                key={val}
              >
                {t(val)}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default withNamespaces()(Tag);
