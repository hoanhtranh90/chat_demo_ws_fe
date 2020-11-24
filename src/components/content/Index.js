import React, { useState,useEffect ,useRef} from 'react';
import SockJsClient from 'react-stomp';
import { connect } from "react-redux";
import Fetch from "json-fetch";



const IContent = (props) => {
    const [mess,setMess] = useState([]);
    const [clientConnected,setClientConnected] = useState(true)
    const [msg,setMsg] = useState('');
    const [data,setData] = useState([])
    const messageRef = useRef();

    useEffect(() => {
        if (messageRef.current) {
          messageRef.current.scrollIntoView(
            {
                behavior: "smooth", block: "end", inline: "nearest"
            })
        }
      })

    let clientRef;
      
    const handleClick = (e) => {
      e.preventDefault();
      let msg = {
        username:props.data.login.info.user != '' ? props.data.login.info.user.username : 'guest',
        content:e.target.form[0].value
      }

      // setMsg('');
      clientRef.sendMessage('/app/send/message' ,JSON.stringify(msg));
      setMsg('')
  }
  
  const handleChange = (e) => {
        setMsg(e.target.form[0].value)
  }

//   componentWillMount() {
//     Fetch("/history", {
//       method: "GET"
//     }).then((response) => {
//       this.setState({ messages: response.body });
//     });
//   }

    return(
        
          <div>
               <SockJsClient url='https://messager-ws.herokuapp.com/socket' topics={['/message']}
                onConnect= { () =>
                // {props.addUonRoom(props.data.login.info.user != '' ?
                //  props.data.login.info.user.username : 'guest'
                //  )}
                {
                 Fetch("https://messager-ws.herokuapp.com/history", {
                    method: "GET"
                  }).then((response) => {
                    setData(response.body)
                    // console.log(response.body[0]);
                  });}
                }
                onDisconnect={ () => {console.log('disconnect')}  }
                onMessage={(msg) => {
                    // let dataAl = {
                    //     username:props.data.login.info.user != '' ? props.data.login.info.user.username : 'guest',
                    //     content:msg.body
                    // }
                    // console.log(msg.body)
                setData([...data,msg.body]);
            }}
                ref={ (client) => { clientRef = client }}
                
            />
          
            <ul style={{height:'80vh',overflow: 'scroll'}} >
                {data.map(item => 
                <div ref={messageRef}>
                    <li style={{display:'grid',gridTemplate:'repeat(1, 1fr) / repeat(4, 1fr)'}}>
                        {props.data.login.info.user.username == item.username ?
                        <div style={{wordBreak:'break-word',gridColumn:'3/5',marginRight:15,textAlign:'end'}}>
                            <div>{item.username}:<br/>{item.content}</div>
                        </div>:(
                        <div style={{wordBreak:'break-word',gridColumn:'1/3'}}>
                            <div>{item.username}:<br/>{item.content}</div>
                        </div>
                        )}
                        </li>
                </div>
                ) }
            </ul>
            <form>
                <input style={{width:'90%'}} onChange={handleChange} placeholder="Type a message..." autocomplete="off" value={msg}></input>
                <button onClick={handleClick}>Submit</button>
            </form>
        </div>
        
    )
}
const mapStateToProps = state => {
    return {
	  data: state
	  
    };
  }
const mapDispatchToProps = dispatch => {
    return {
        addUonRoom: (user) => {
            dispatch({
                type:"ADD_USER_ON_ROOM",
                payload:user
			})
        },
        deleteURoom: (user) => {
            dispatch({
                type:"DELETE_USER_ON_ROOM",
                payload:user
			})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IContent);