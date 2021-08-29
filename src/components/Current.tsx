import axios from 'axios'
import { useState, useEffect } from 'react'

type bitType = {
    time: {
        updated: string,
        updatedISO: string,
        updateduk: string
    },
    disclaimer: string,
    bpi: {
        USD: {
            code: string,
            rate: string,
            description: string,
            rate_float: number
        },
        THB: {
            code: string,
            rate: string,
            description: string,
            rate_float: number
        }
    }
}

const Current = () => {
    const [task, setTask] = useState<bitType | null>(null)
    const [loading, setLoading] = useState(true)
    const [err, setErr] = useState(false)

    const fetchAPI = async () => {
        try {
            const resp = await axios.get<bitType>('https://api.coindesk.com/v1/bpi/currentprice/thb.json')
            setTask(resp.data)
            setLoading(false)
            setErr(false)
        }
        catch {
            setLoading(false)
            setErr(true)
        }
    }

    useEffect(() => {
        fetchAPI()
    }, [])

    const render = () => {
        if (loading) {
            return (
                <p className='text-2xl'>Loading ...</p>
            )
        }
        else if (err) {
            return (
                <p className='text-xl text-red-500'>There was an error. Please try again later.</p>
            )
        }
        else {
            return (
                <div className='space-y-3'>
                    <p className='text-2xl'>{task?.bpi.THB.rate_float.toLocaleString()} THB</p>
                    <p> (Last updated {task?.time.updated}) </p>
                </div>
            )
        }
    }

    return (
        <div className='my-5'>
            <div className='text-center space-y-3'>
                <p className='text-2xl font-semibold '>Current price</p>
                {render()}
            </div>
        </div>
    )

}

export default Current