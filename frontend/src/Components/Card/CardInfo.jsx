import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import {useLocation, useNavigate} from "react-router-dom"
import { useContext } from 'react';
import Context from "../state"
import axios from "axios"
import {toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height:500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  };

const CardInfo = (props)=>{

    const navigate = useNavigate()
    const location = useLocation()
    const {user} = useContext(Context)
    
    const DeleteHandler = async() =>{
        await axios.post(`${process.env.REACT_APP_BASE_URL}/insert/delete`,{id:props.id},{
            withCredentials: true
        }).then(()=>{
            window.location.reload()
            toast("Data Deleted Successfully")
        })
    }

    return (
    <Box sx={style}>
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
                            <Typography sx={{ mb: 1.5 }} variant="body1">
                                {"Between " + props.data.start_time + " to " + props.data.end_time}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} variant="body1">
                               {"Gender: " + props.data.gender}
                            </Typography>

                            <Typography sx={{ mb: 1.5 }} variant="body1">
                               {"Comment: "} {props.data.comment.length ? props.data.comment : "No Comment Given By User"}
                            </Typography>

                           { props.data.userId=== user.user_id?
                              <CardActions>
                                <Button size="large" onClick={()=>navigate('/update',{state:{data:props.data,id:props.id}})}>Update Details</Button>
                                <Button size="large" onClick={()=>DeleteHandler()}>Delete</Button>
                              </CardActions> : null}
                        </CardContent>
                    </div>
                </Card>
            </Box>
)}

export default CardInfo