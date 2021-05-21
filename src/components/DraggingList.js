import { useState } from 'react'

// set the initial state as outside variables for cleaner code inside the component. Also will be easier for users to set their own initial data this way.
const items = [
    { name: "Pikachu", url: "https://secure.img1-fg.wfcdn.com/im/02238154/compr-r85/8470/84707680/pokemon-pikachu-wall-decal.jpg" },
    { name: "Bulbasaur", url: "https://static.pokemonpets.com/images/monsters-images-300-300/1-Bulbasaur.png" },
    { name: "Squirtle", url: "https://img.pokemondb.net/artwork/large/squirtle.jpg" },
    { name: "Charmander", url: "https://img.pokemondb.net/artwork/large/charmander.jpg" },
    { name: "Eevee", url: "https://cdn2.bulbagarden.net/upload/thumb/e/e2/133Eevee.png/1200px-133Eevee.png" },
]

const initialDraggingState = {
    draggingFrom: null,
    draggingTo: null,
    isDragging: false,
    originalList: [],
    updatedList: []
}




const DraggingList = (props) => {
    const [list, setList] = useState(items)

    const [dragging, setDragging] = useState(initialDraggingState)



    const onDragStart = (event) => {
        const initialPosition = Number(event.currentTarget.dataset.position);

        setDragging({
            ...dragging,
            draggingFrom: initialPosition,
            isDragging: true,
            originalList: list
        });

        // event.dataTransfer.setData("text/html", '')
    }
    
    const onDragOver = (event) => {
        // prevent the default so it is allowed to be dropped
        event.preventDefault();

        //setting the original list order that will be changed
        let newOrder = dragging.originalList;

        // setting the space it was moved from
        const draggingFrom = dragging.draggingFrom;

        //setting the space it is being held over
        const draggingTo = Number(event.currentTarget.dataset.position);

        // get the item from the original position
        const itemDragged = newOrder[draggingFrom];

        // filter out item being dragged
        const remainingItems = newOrder.filter((item, index) => index !== draggingFrom);

        //update the new order
        newOrder = [
            ...remainingItems.slice(0, draggingTo),
            itemDragged,
            ...remainingItems.slice(draggingTo)
        ];

        // check to see if the item has actually been moved
        if (draggingTo !== dragging.draggingTo){
            setDragging({
                ...dragging,
                updatedList: newOrder,
                draggingTo: draggingTo
            })
        }
    }

    const onDrop = () => {
        setList(dragging.updatedList);

        //reset the state of dragging
        setDragging({
            ...dragging,
            draggingFrom: null,
            draggingTo: null,
            isDragging: false
        });
    }







    return (
        <section>
            <h1>Drag items to reorder them!</h1>
            <ul>
                {/* still allows users to set their own data and formatting.  */}
                {list.map((item, index) => {
                    return (
                        <li key={index} 
                        data-position={index}
                        draggable="true" 
                        onDragStart={onDragStart} 
                        onDragOver={onDragOver}
                        onDrop={onDrop}
                        >
                            {/* Some sample formatting */}
                            <span>{item.name}</span>
                            <img src={item.url}/>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}

export default DraggingList;