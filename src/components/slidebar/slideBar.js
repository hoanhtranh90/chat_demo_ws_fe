import React from 'react';
import '../../css/slideBar/slidebar.css'
import { connect } from "react-redux";

const Slidebar = (props) => {
    // console.log(props.data.login.userOnRoom)
    return(
        <>
            <div className="grid-item">Chat box</div>

        <div className="slidebar-grid">
            {/* {props.data.login.userOnRoom.map(item    => <div className="grid-item">{item}</div>)} */}
        </div>
        </>
    )
}
const mapStateToProps = state => {
    return {
    data: state
  //   data: state.data.login.info
    
    };
  }

  export default connect(mapStateToProps, null)(Slidebar);
  
