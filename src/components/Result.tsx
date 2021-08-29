import axios from 'axios'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

type resultType = {
    time: {
        updated: string,
        updatedISO: string,
        updateduk: string
    },
    disclaimer: string,
    bpi: Record<string, number> | null ;
} 
const Result = () => {
    const query = new URLSearchParams(useLocation().search)
    let startDate = query.get('start')
    let endDate = query.get('end')

    const [date, setDate] = useState<resultType | null>(null)
    const [loading, setLoading] = useState(true)
    const [err, setErr] = useState(false)

    
    const fetchData = async () => {
        try{
            const resp = await axios.get<resultType>(`https://api.coindesk.com/v1/bpi/historical/close.json?currency=THB&start=${startDate}&end=${endDate}`)
            setDate(resp.data)
            setLoading(false)
            setErr(false)
        }
        catch(err) {
            setLoading(false)
            setErr(true)
        }
    }
    useEffect(() => {
            fetchData()
    }, [])

    const render = () => {
        if (loading) {
            return (
                <div className='text-center space-y-3'>
                    <p className='text-2xl font-semibold'>Loading ...</p>
                </div>
            )
        }
        else if (err) {
            return (
                <div className='text-center space-y-3'>
                    <p className='text-2xl font-semibold'>There was an error. Please try again later.</p>
                </div>
            )
        }
        else {
            type printType = {
                key: string;
                value: number;
            }
            const printList: printType[]= []
    
            if(date?.bpi) {
                for (const [key, value] of Object.entries(date?.bpi)) {
                    printList.push({key,value})
                }
            }

            return (
                <div className='text-center space-y-3'>
                    <p className='text-2xl font-semibold'>Historical price</p>
                    <p className='text-xl font-semibold'> ( From {startDate} To {endDate} )</p>
                    <ul>
                        {printList.map((e) => <li className='text-xl' key={e.key}>{e.key} - {e.value.toLocaleString()} THB</li> )}
                    </ul>
                </div>
            )
        }
    }
    return (
        <div>
            {render()}
        </div>
    )
}

export default Result