import React from 'react'
import Typewriter from 'typewriter-effect';
import {CenteredText} from './Styled/Components'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

function Index() {
    return (
        <CenteredText>
            <Typewriter
                options={{
                    strings: ['404???'],
                    autoStart: true,
                    loop: true,
                }}
            />
            <Link className="btn btn-outline-light btn-lg" to="/">
                <FontAwesomeIcon icon={faHome} className="me-1"/>
                Home
            </Link>
        </CenteredText>
    )
}

export default Index
