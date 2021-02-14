import React from 'react'
import { Nav, Navbar } from 'react-bootstrap';
import { connect } from 'react-redux';

export interface NavBarProps {
    user: {
        name: string,
        score: number
    }
}

const NavBar: React.FC<NavBarProps> = (props: NavBarProps) => {
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>welcome {props.user.name}</Navbar.Brand>
                <Nav className="mr-auto">
                </Nav>
                <Nav>
                    <span style={{color: "yellow"}}>
                        Score: {props.user.score}
                    </span>
                </Nav>
            </Navbar>
        </div>
    );
}

const mapStateToProps = (state: any) => ({
    user: state.user
})

export default connect(mapStateToProps)(NavBar);