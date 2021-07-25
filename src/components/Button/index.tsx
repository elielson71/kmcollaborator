//import {Children, ReactNode} from 'react'
import './style.scss'

type ButtonPops = {
    text: string;
    //children:ReactNode,
}

export function Button(props: ButtonPops) {
    return (
        <div id="button">
            <button className='btn btn-primary btn-lg btn-block' >
                {props.text}
            </button>
        </div>
    )
}