import { useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Context from '../state';
import Update_Form from "./Update_Form"

const Update = () => {

    const { user } = useContext(Context)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (user.user_token === null) navigate('/login')
        return;
    }, [])

    return (
        <>
            <Update_Form data={location.state.data} id={location.state.id} />
        </>
    )
}

export default Update;