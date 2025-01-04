import axios from "axios"
import { useContext, useEffect, useState } from "react";
import Cards from "../Card/Cards"
import Filter from "../Filter/Filter"
import './Home.css'
import { useNavigate } from "react-router-dom";
import { Box } from '@mui/material';
import Typewriter from 'typewriter-effect';
import SendIcon from '@mui/icons-material/Send';
import { Button } from '@mui/material';
import Context from '../state'

const Home = () => {
    const [data, udpateData] = useState(null)
    const [firstTime, updateFirst] = useState(null)
    const { user, setuser } = useContext(Context)
    const [filter, updatefilter] = useState({
        source: "All",
        destination: "All",
        date: "All"
    })
    const navigate = useNavigate();


    const fetch = async () => {
        let filter_final = {};
        if (filter.source !== "All") filter_final.source = filter.source
        if (filter.destination !== "All") filter_final.destination = filter.destination
        if (filter.date !== "All") filter_final.date = filter.date
        console.log(process.env.REACT_APP_BASE_URL)
        await axios.get(`${process.env.REACT_APP_BASE_URL}/get_data`, {
            params: { data: filter_final, },
            withCredentials: true
        })
            .then((res) => {
                if (res.data.success) {
                    udpateData(res.data.data)
                    if (firstTime === null) {
                        updateFirst(res.data.data)
                    }
                    setuser((prev) => {
                        const data = { ...prev, user_token: res.data.token, user_name: res.data.user_name, user_id: res.data.id }
                        return data;
                    })
                }
                else {
                    navigate("/login")
                }
            })
    }

    useEffect(() => {
        fetch()
    }, [filter])

    const Navigate = () => {
        navigate("/form")
    }

    return (
        <>
            <div style={{ width: "90%", height: "40%", padding: "20px 0", position: "relative", margin: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div className="web_name">Ride Sharing</div>
                <div className="user_style">
                    {user.user_name ? <div style={{ fontSize: "20px", fontWeight: "bold" }}>Hii {user.user_name}</div> : null}
                    <Button onClick={Navigate} variant="contained" endIcon={<SendIcon />} type="submit">Have a Journey?</Button>
                </div>
            </div>
            {
                data ?
                    <div className="entry">
                        <div className="filter_main">
                            <Box sx={{ p: 2, border: '1px dashed grey', rowGap: "20px", display: "flex", flexDirection: "column" }}>
                                <div className="filter_heading"><Typewriter options={{ strings: ['Apply Filters'], autoStart: true, loop: true }} /></div>
                                {<Filter check="box" boxname="source" data={firstTime} update={updatefilter} />}
                                {<Filter check="box" boxname="destination" data={firstTime} update={updatefilter} />}
                                {<Filter check="date" boxname="date" data={firstTime} update={updatefilter} />}
                            </Box>
                        </div>
                        <div className="main">
                            {data.length !== 0 ? data.map((res) => {
                                return (
                                    <Cards key={res._id} data={res} />
                                )
                            }) : <p class="data">No data</p>
                            }
                        </div>
                    </div> :
                    <p style={{ color: "white" }}>Loading..</p>
            }
        </>
    )
}

export default Home;