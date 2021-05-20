import { useState } from 'react'

const Home = (props) => {
    const [list, setList] = useState([])


    // Create setter function that updates the list with setList

    // Add drag and drop implementation




    return (
        <div>
            <h1>
                Home page here
            </h1>
            {list}
        </div>
    );
}

export default Home;