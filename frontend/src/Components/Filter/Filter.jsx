import InputBox from './InputBox'
import './Filter.css'

const Filter = (props) => {
    return (
        <div className='filter_width'>
            <InputBox check={props.check} boxname={props.boxname} data={props.data} update={props.update} />
        </div>
    )
}

export default Filter;