import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { connect } from "react-redux";


import '../css/Navb.css';
const Navb = (props) => {
    return (
        <div>
            <Navbar className="navb" collapseOnSelect expand="lg" bg="dark" variant="dark" >
					<Navbar.Brand as={Link} to="/" style={{color:'black'}}>Trang chu</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="mr-auto">
							{/* <Nav.Link as={Link} to="/Ques">Title1</Nav.Link>
							<Nav.Link as={Link} to="/CreateQues">Title 2</Nav.Link>
							<NavDropdown title="DropDown" id="collasible-nav-dropdown">
								<NavDropdown.Item as={Link} to="/FastVocab">Fast Vocabulary</NavDropdown.Item>
								<NavDropdown.Item as={Link} to="/TopicVocab" >Topic Vocab</NavDropdown.Item>
									
								<NavDropdown.Item as={Link} to="/CreateVocab">Create Vocabulary</NavDropdown.Item>
									
							</NavDropdown> */}
						</Nav>
						{props.data.login.info.user == '' ?
						(<Nav>
							<Nav.Link as={Link} to="/login" style={{color:'black'}}>Đăng Nhập</Nav.Link>
							<Nav.Link as={Link} to="/register" style={{color:'black'}}>Đăng ký</Nav.Link>
						</Nav> ) : (
							<NavDropdown title="Tài khoản" id="collasible-nav-dropdown">
							<NavDropdown.Item as={Link} to="/FastVocab">{props.data.login.info.user.username}</NavDropdown.Item>

							<NavDropdown.Item onClick={()=> {
								props.logout()
							}}>Log Out</NavDropdown.Item>
						</NavDropdown>
						)
						}
					</Navbar.Collapse>
				</Navbar>
        </div>
    )
}

const mapStateToProps = state => {
    return {
	  data: state
	//   data: state.data.login.info
	  
    };
  }
const mapDispatchToProps = dispatch => {
    return {
        logout: test => {
            dispatch({
                type:"LOGOUT",
                payload:test
			},{
					type:"AUTH_REFRESH",
					
				
			}
			)
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Navb);