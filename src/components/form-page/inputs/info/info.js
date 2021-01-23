import React from "react"
import styles from "./info.module.scss";
import infoIcon from "../../../../images/infoIcon.svg"

class InfoIcon extends React.Component {
    constructor(props) {
        super(props)
      
        this.state ={
            showInfo:false
        }
      
        this.toggleState = this.toggleState.bind(this);
    }
    
    toggleState(){
        this.setState({showInfo: !this.state.showInfo})
    } 

    render() {
        return( 
            <div className={styles.infoWrapper}>
                <img className={styles.infoImage} src={infoIcon} onClick={this.toggleState} alt="i inside circle"/>
                { this.state.showInfo ?
                    <>
                        <div className={styles.infoMessage}> {this.props.message} </div>
                        <div className={styles.square} ></div>
                    </>
                : null } 
            </div>   
        )
    }
}
  
export default InfoIcon