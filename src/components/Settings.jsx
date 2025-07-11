function DarkMode() {
    return (
        <button onClick={() => { }}>Dark mode</button>
    )
}

export default function Settings() {
    return (
        <div>
            <h2>Settings</h2>
            <DarkMode />
        </div>
    )
}