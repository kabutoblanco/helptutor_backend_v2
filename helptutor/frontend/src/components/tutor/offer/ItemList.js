import React from 'react'

export default function ItemList(props) {
    const{data}=props

    return (
        <div className="item-offer d-flex">
            <div className="offer-view">
                <div className="avatar">
                    <img src={data.student.user.photo} alt="" />
                </div>
                <div className="offer-information">
                    <span className="offer-title">
                        {data.title}
                    </span>
                    <span className="offer-autor">
                        {data.student.user.first_name}
                    </span>
                    <span className="offer-description">

                    </span>
                </div>
            </div>
            <div className="offer-options">
                <button className="btn btn-primary">POSTULAR</button>
                <button className="btn btn-secundary">x</button>
            </div>
        </div>
    )
}
