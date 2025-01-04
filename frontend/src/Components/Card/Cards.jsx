import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ModalInfo from './Modal_Info.jsx';
import { useState } from 'react';


const Cards = (props) => {
    const [open, setopen] = useState(false);
    return (
        <>
            {open ? <ModalInfo id={props.data._id} data={props.data} open={open} setopen={setopen} /> : null}
            <Box sx={{ minWidth: 400 }}>
                <Card variant="outlined">
                    <div style={{ width: "100%", height: "100%", display: "flex", rowGap: "10px", flexDirection: "column" }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                                {props.data.user_name}
                            </Typography>
                            <Typography variant="h5" component="div">
                                {props.data.phone_no}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                {props.data.email}
                            </Typography>
                            <Typography sx={{ mb: 1.5, maxWidth: 400 }} variant="body1">
                                {"Going from " + props.data.source + " to " + props.data.destination}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} variant="body1">
                                {"Journey Date: " + props.data.date}
                            </Typography>
                            <Typography variant="body1">
                                {"Between " + props.data.start_time + " to " + props.data.end_time}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="large" onClick={() => setopen(true)}>More Details</Button>
                        </CardActions>
                    </div>
                </Card>
            </Box>
        </>
    );
}

export default Cards;