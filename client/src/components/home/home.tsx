import React from 'react'
import NavBar from '../header/navbar/navbar'
import Main from '../main/main'

export interface HomeProps {

}

const Home: React.FC<HomeProps> = () => {
    return (
        <div>
            <NavBar />
            <Main />
        </div>
    );
}

export default Home;