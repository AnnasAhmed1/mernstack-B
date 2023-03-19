import React from 'react'
import { InstagramOutlined } from "@ant-design/icons";
import { GlobalOutlined } from "@ant-design/icons";
import "../../Styles/Pages/_placesDetails.scss";

function BottomBarDetail({ data = {
    "id": null,
    "name": "The HUNTR",
    "profileImageUrl": "https://backend.swipetechstudio.com/images/default-editor.png"
} }) {
    return (
        <div className="bottom-bar-detail">
            <div>
                <p>by</p>
                <img src={data?.profileImageUrl} alt="The Hunter" className='bottomBarImage' />
                <p>{data?.name}</p>
            </div>
            <div className='brandName'>
                <p>
                    <GlobalOutlined />
                    branddubai.com
                </p>
                <p>
                    <InstagramOutlined />
                    DubaiDestinations
                </p>
            </div>
        </div>
    )
}

export default BottomBarDetail