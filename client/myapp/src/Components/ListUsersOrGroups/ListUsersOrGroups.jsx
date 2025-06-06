import React from 'react'

function ListUsersOrGroups(props) {
    //props:{onClickItem:function,item:object with _id, image, name}
    return (
        <div>
            <button onClick={() => props.onClickItem(props.item._id)} className="item">
                <img src={props.item.image} alt={"image of " + props.item.name} />
                <h3>{props.item.name}</h3>
            </button>
        </div>
    )
}

export default ListUsersOrGroups