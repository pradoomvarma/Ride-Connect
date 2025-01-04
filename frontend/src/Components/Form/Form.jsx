import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import { Button, colors } from '@mui/material';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import SendIcon from '@mui/icons-material/Send';
import './Form.css'
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import dayjs from 'dayjs';
import Typewriter from 'typewriter-effect';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Context from '../state'
const advancedFormat = require('dayjs/plugin/advancedFormat');
const utc = require('dayjs/plugin/utc');
dayjs.extend(advancedFormat);
dayjs.extend(utc)

const Form = () => {

    const { user, setuser } = useContext(Context)

    const [data, udpateData] = useState({
        user_name: '',
        phone_no: '',
        email: '',
        source: '',
        destination: '',
        start_time: '',
        end_time: '',
        gender: 'Male',
        comment: '',
    });

    const navigate = useNavigate()

    const SubmitHandler = async (e) => {
        e.preventDefault();
        const timer = data.date + " " + data.end_time;
        const obj = dayjs(timer, 'DD-MM-YYYY hh:mm A');
        const parse_date = dayjs(obj).utc().toDate()
        await axios({
            method: 'POST',
            url: `${process.env.REACT_APP_BASE_URL}/insert/insert_data`,
            data: { ...data, expire: parse_date, id: user.user_id },
            withCredentials: true
        }).then((res) => {
            toast("Details Submitted Successfully")
            navigate("/")
        })
    }

    const HandleData = (e) => {
        udpateData({ ...data, [e.target.name]: e.target.value });
    }

    const check = async () => {
        await axios.get(`${process.env.REACT_APP_BASE_URL}/check`, {
            withCredentials: true,
        }).then((res) => {
            console.log(res)
            if (!res.data.success) navigate("/login")
            else {
                setuser({
                    user_token: res.data.token,
                    user_name: res.data.user_name,
                    user_id: res.data.id
                })
            }
        })
    }

    useEffect(() => {
        console.log(user)
        if (user.user_token) return;
        check()
    }, [])

    return (
        <>
            <div className='field'>
                <form onSubmit={SubmitHandler}>
                    <div><ArrowBackIcon onClick={() => navigate('/')} style={{ fontSize: "50px", paddingLeft: "15px", paddingTop: "15px", position: "relative", cursor: "pointer" }} /> </div>
                    <div className="web_name" style={{ fontSize: "100px", textAlign: 'center', marginBottom: "3%", position: "relative", height: "fit-content" }}>Ride Sharing</div>
                    <div className='heading'><Typewriter options={{ strings: ['Submit your Journey Details'], autoStart: true, loop: true }} /></div>
                    <div className='sub_field'>
                        <TextField id="outlined-basic" name='user_name' value={data.user_name} onChange={HandleData} required className='width_change' label="Name" variant="outlined" />
                        <TextField id="outlined-basic" name="phone_no" value={data.phone_no} onChange={HandleData} required className='width_change' label="Phone No." variant="outlined" />
                        <TextField id="outlined-basic" name="email" value={data.email} onChange={HandleData} required className='width_change' label="Email" variant="outlined" />
                        <TextField id="outlined-basic" name="source" value={data.source} onChange={HandleData} required className='width_change' label="Source" variant="outlined" />
                        <TextField id="outlined-basic" name="destination" value={data.destination} onChange={HandleData} required className='width_change' label="Destination" variant="outlined" />


                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker slotProps={{ textField: { required: true } }} disablePast format="DD-MM-YYYY"
                                onChange={(val) => udpateData({ ...data, "date": dayjs(val).format("DD-MM-YYYY") })} className='width_change' label="Enter the Journey Date" />
                        </LocalizationProvider>


                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker slotProps={{ textField: { required: true } }} onChange={(val) => udpateData({ ...data, "start_time": dayjs(val).format("hh:mm A") })} className='width_change' label="Start Time" />
                        </LocalizationProvider>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker slotProps={{ textField: { required: true } }} onChange={(val) => udpateData({ ...data, "end_time": dayjs(val).format("hh:mm A") })} className='width_change' label="End Time" />
                        </LocalizationProvider>


                        <FormControl style={{ width: "100%" }}>
                            <FormLabel id="demo-row-radio-buttons-group-label" className='radio_label'>Gender</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="gender"
                                className='radio_button'
                                onChange={HandleData}
                                defaultValue="male"
                            >
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                            </RadioGroup>
                        </FormControl>


                        <TextField id="outlined-basic" name='comment' value={data.comment} onChange={HandleData} className='width_change_comment' label="Comment" variant="outlined" />
                        <div className='button'><Button variant="contained" endIcon={<SendIcon />} type="submit">Submit</Button></div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Form;