import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const InputBox = (props) => {
    const [name, setname] = useState("All");
    const seenValues = new Set();

    const handleChange = (event) => {
        setname(event.target.value);
        props.update((e) => {
            const newState = { ...e, [props.boxname]: event.target.value === null ? "" : event.target.value };
            return newState
        })
    };

    const updateDate = (date) => {
        console.log(date)
        props.update((e) => {
            const newState = { ...e, [props.boxname]: date };
            return newState;
        })
    }

    return (
        props.check === "box" ?
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{props.boxname}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={name}
                    label={props.boxname}
                    onChange={handleChange}
                >
                    <MenuItem value={"All"}>All</MenuItem>
                    {props.data.map((item, index) =>
                        !seenValues.has(item[props.boxname]) ? seenValues.add(item[props.boxname]) && <MenuItem key={item._id} value={item[props.boxname]}>{item[props.boxname]}</MenuItem> : null
                    )}
                </Select>
            </FormControl>
            :
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker slotProps={{
                    textField: { fullWidth: true }, actionBar: {
                        actions: ['clear']
                    }
                }} disablePast format="DD-MM-YYYY" className='change_filter_date'
                    onChange={(val) => updateDate(val !== null ? dayjs(val).format("DD-MM-YYYY") : "All")} label="Enter the Journey Date" />
            </LocalizationProvider>
    );
}

export default InputBox;