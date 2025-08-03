import './hamburgerMenu.css'

export default function ResetButton({ resetProgress }) {
    return (
        <button className="reset-progress-button" onClick={() => resetProgress()}>
            <p>Reset points</p>
        </button>
    )
}