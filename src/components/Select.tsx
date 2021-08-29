import axios from 'axios'
import { useState, useEffect } from 'react'
import {Link, useHistory } from 'react-router-dom'
import Result from './Result'

const Select = () => {
    let history = useHistory()

    const [start,setStart] = useState("")
    const [end,setEnd] = useState("")
    const clicked = (start: string, end:string) =>{
        let Start = new Date(start)
        let End = new Date(end)
        if(start === " " || end === " " || End < Start){
            alert("Plese select start date and end date correctly")
        }else{
            history.push("result?start="+start+"&end="+ end);
            <Result/>
        }
    }
    return(
        <div className='text-center space-y-3 space-x-3'>
            <p className='text-2xl font-semibold'>Select historical range</p>
            <span>From date</span>
            <input type='date' onChange={e => setStart(e.target.value)}></input>
            <span>To date</span>
            <input type='date' onChange={e => setEnd(e.target.value)}></input>
            <br />
            <button onClick={() => clicked(start,end)}>Get data</button>
        </div>
    )
}

export default Select