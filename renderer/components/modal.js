export default({message,onYes,onCancel})=>(
    <div>
        <button onClick={onYes}>yes</button>
        <button onClick={onCancel}>no</button>
    </div>
)