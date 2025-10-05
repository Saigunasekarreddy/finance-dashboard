import React from 'react'
import styled, { keyframes } from 'styled-components'
import { useWindowSize } from '../../utils/useWindowSize';

function Orb() {

    const {width, height} = useWindowSize()

    // We should only define keyframes inside the component if we are working with dynamic values.
    // So we can dynamically update the animation based on the window size.
    const moveOrb = keyframes`
        0% {
            transform: translate(0, 0);
        }
        50% {
            transform: translate(${width}px, ${height / 2}px);
        }
        100% {
            transform: translate(0, 0);
        }
    `

    const OrbStyled = styled.div`
        width: 70vh;
        height: 70vh;
        position: absolute;
        border-radius: 50%;
        margin-left: -37vh;
        margin-top: -37vh;
        background: linear-gradient(180deg, #F56692 0%, #F2994A 100%);
        filter: blur(400px);
        animation: ${moveOrb} 15s alternate linear infinite;
    `;

    return (
        <OrbStyled></OrbStyled>
    )
}

export default Orb;
