import './inputComponent.css'

const InputComponent = ({type, name, value, setValue}) => {
    
    return (
        <div className="block"> 
            <label className="title"> {name} </label>
            <input className='input-box'
                   type={type} 
                   placeholder="Placeholder"
                   value={value}
                   min="0"
                   onChange= {(e) => {setValue(e.target.value)}}
            />
        </div>
    )

}

export default InputComponent