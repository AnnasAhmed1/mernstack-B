import React from "react";

import { ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { VisibilityContext } from "react-horizontal-scrolling-menu";

function Arrow({
    children,
    disabled,
    onClick,
    style
}) {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            style={{
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                // right: "1%",
                opacity: disabled ? "0" : "1",
                userSelect: "none",
                height: '40px',
                borderRadius: '50%',
                width: '40px',
                backgroundColor: 'black',
                border:"1px solid #707070",
                position:"absolute",
                right:0,
                zIndex:99,
               ...style,
            }}
        >
            {children}
        </button>
    );
}

export function LeftArrow() {
    const {
        isFirstItemVisible,
        scrollPrev,
        visibleElements,
        initComplete
    } = React.useContext(VisibilityContext);

    const [disabled, setDisabled] = React.useState(
        !initComplete || (initComplete && isFirstItemVisible)
    );
    React.useEffect(() => {
        // NOTE: detect if whole component visible
        if (visibleElements.length) {
            setDisabled(isFirstItemVisible);
        }
    }, [isFirstItemVisible, visibleElements]);

    return (
        <Arrow disabled={disabled} onClick={() => scrollPrev()} style={{left:0}}>
            <ArrowLeftOutlined style={{color:"white"}} />
        </Arrow>
    );
}

export function RightArrow() {
    const { isLastItemVisible, scrollNext, visibleElements } = React.useContext(
        VisibilityContext
    );

    // console.log({ isLastItemVisible });
    const [disabled, setDisabled] = React.useState(
        !visibleElements.length && isLastItemVisible
    );
    React.useEffect(() => {
        if (visibleElements.length) {
            setDisabled(isLastItemVisible);
        }
    }, [isLastItemVisible, visibleElements]);

    return (
        <Arrow disabled={disabled} onClick={() => scrollNext()}>
            <ArrowRightOutlined style={{color:"white"}} />
        </Arrow>
    );
}
