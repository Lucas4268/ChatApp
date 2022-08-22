import { useState } from "react"

export const useForm = <T>( initialState: T ) => {
    const [ state, setState ] = useState(initialState);

    const onChange = ( text: string, name: string ) => {
        setState({
            ...state,
            [name]: text
        })
    }

    return {
        formState: state,
        onChange
    }
}