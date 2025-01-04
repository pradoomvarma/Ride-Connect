import Modal from '@mui/material/Modal';
import { useState } from 'react';
import CardInfo  from './CardInfo';

const Modal_Info = (props)=>{
    const [open, setOpen] = useState(props.open);
    const handleClose = () => { setOpen(false); props.setopen(false); }
    console.log(props.data)
    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <CardInfo id={props.id} data={props.data}/>
            </Modal>
     </>
    )
}

export default Modal_Info