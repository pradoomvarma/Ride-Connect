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
import './Update_Form.css'
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

const Update_Form = (props) => {
    const { user, setuser } = useContext(Context)

    const [data, udpateData] = useState({
        user_name: props.data.user_name,
        phone_no: props.data.phone_no,
        email: props.data.email,
        source: props.data.source,
        destination: props.data.destination,
        start_time: props.data.start_time,
        end_time: props.data.end_time,
        gender: props.data.gender,
        comment: props.data.comment,
        cardId: props.id
    });

    const navigate = useNavigate()

    const SubmitHandler = async (e) => {
        e.preventDefault();
        const timer = data.date + " " + data.end_time;
        const obj = dayjs(timer, 'DD-MM-YYYY hh:mm A');
        const parse_date = dayjs(obj).utc().toDate()
        await axios({
            method: 'POST',
            url: `${process.env.REACT_APP_BASE_URL}/insert/update_data`,
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

    console.log(props.data)
    return (
        <>
            <div className='field'>
                <form onSubmit={SubmitHandler}>
                    <div><ArrowBackIcon onClick={() => navigate('/')} style={{ fontSize: "50px", paddingLeft: "15px", paddingTop: "15px", position: "relative", cursor: "pointer" }} /> </div>
                    <div className="web_name" style={{ fontSize: "100px", textAlign: 'center', marginBottom: "3%", position: "relative", height: "fit-content" }}>Companion</div>
                    <div className='heading'><Typewriter options={{ strings: ['Submit your Journey Details'], autoStart: true, loop: true }} /></div>
                    <div className='sub_field'>
                        <TextField id="outlined-basic" name='user_name' value={data.user_name} onChange={HandleData} required className='width_change' label="Name" variant="outlined" />
                        <TextField id="outlined-basic" name="phone_no" value={data.phone_no} onChange={HandleData} required className='width_change' label="Phone No." variant="outlined" />
                        <TextField id="outlined-basic" name="email" value={data.email} onChange={HandleData} required className='width_change' label="Email" variant="outlined" />
                        <TextField id="outlined-basic" name="source" value={data.source} onChange={HandleData} required className='width_change' label="Source" variant="outlined" />
                        <TextField id="outlined-basic" name="destination" value={data.destination} onChange={HandleData} required className='width_change' label="Destination" variant="outlined" />


                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker slotProps={{ textField: { required: true } }} disablePast format="DD-MM-YYYY" value={dayjs(props.data.date, "DD-MM-YYYY")}
                                onChange={(val) => udpateData({ ...data, "date": dayjs(val).format("DD-MM-YYYY") })} className='width_change' label="Enter the Journey Date" />
                        </LocalizationProvider>


                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker slotProps={{ textField: { required: true } }} value={dayjs(props.data.start_time, "hh:mm A")} onChange={(val) => udpateData({ ...data, "start_time": dayjs(val).format("hh:mm A") })} className='width_change' label="Start Time" />
                        </LocalizationProvider>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker slotProps={{ textField: { required: true } }} value={dayjs(props.data.end_time, "hh:mm A")} onChange={(val) => udpateData({ ...data, "end_time": dayjs(val).format("hh:mm A") })} className='width_change' label="End Time" />
                        </LocalizationProvider>


                        <FormControl style={{ width: "100%" }}>
                            <FormLabel id="demo-row-radio-buttons-group-label" className='radio_label'>Gender</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="gender"
                                className='radio_button'
                                onChange={HandleData}
                                defaultValue={props.data.gender.toLowerCase()}
                            >
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                            </RadioGroup>
                        </FormControl>


                        <TextField id="outlined-basic" name='comment' value={data.comment} onChange={HandleData} className='width_change_comment' label="Comment" variant="outlined" />
                        <div className='button'><Button variant="contained" endIcon={<SendIcon />} type="submit">Update</Button></div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Update_Form;