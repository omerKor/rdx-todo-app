import React from 'react'

function Footer() {
    return (
        <footer className="info">
            <p>Click to edit a todo</p>
            <p>Created by <a href="omerkor.com">Ömer Kor</a></p>
            <p>Part of <a href="todo.omerkor.com">TodoAPP</a></p>
        </footer>
    )
}


//sabit bir component olduğu için react.memo kullandım ki boşuna render olmasın.
export default React.memo(Footer);