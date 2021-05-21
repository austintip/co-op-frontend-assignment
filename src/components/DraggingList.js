import { useState } from 'react'

// set the initial state as outside variables for cleaner code inside the component. Also will be easier for users to set their own initial data this way.

// this is some sample data that can be swapped out for other items
const items = [
    { name: "Pikachu", url: "https://lh3.googleusercontent.com/proxy/KZ2KHA4lHxKZoWI2sNh_BJQZu_jU0FldrTBnjqcWX8IyHMGooRhamy3L4dJuEnjQaH_suJWi8h8u2qZ_EwWMhbl_zxDBAX-Nbge_vAjtEcTkcVHhLOgE5qs" },
    { name: "Bulbasaur", url: "https://static.pokemonpets.com/images/monsters-images-300-300/1-Bulbasaur.png" },
    { name: "Squirtle", url: "http://static.pokemonpets.com/images/monsters-images-800-800/7-Squirtle.png" },
    { name: "Charmander", url: "https://clipart.info/images/ccovers/1528080667Charmander-pokemon-transparent.png" },
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

        //this makes it work on firefox
        event.dataTransfer.setData("text/html", '')
    }
    
    const onDragOver = (event) => {
        // prevent the default so it is allowed to be dropped
        event.preventDefault();

        //set the original list order that will be changed
        let newOrder = dragging.originalList;

        // set the space it was moved from
        const draggingFrom = dragging.draggingFrom;

        //set the space it is being held over
        const draggingTo = Number(event.currentTarget.dataset.position);

        // get the item from the original position
        const itemDragged = newOrder[draggingFrom];

        // filter out the item being dragged
        const remainingItems = newOrder.filter((item, index) => index !== draggingFrom);

        //update the new order
        newOrder = [
            ...remainingItems.slice(0, draggingTo),
            itemDragged,
            ...remainingItems.slice(draggingTo)
        ];

        // check to see if the item has actually been moved to a new location
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