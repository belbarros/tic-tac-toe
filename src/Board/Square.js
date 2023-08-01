import './Square.css'

export default function Square({ square, handleClick }) {

    return (
        <button className="square" onClick={handleClick}>{square}</button>
    )
}