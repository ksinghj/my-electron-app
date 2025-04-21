const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`

const pingButton = document.getElementById('ping')
pingButton.addEventListener('click', () => {
    pingButton.innerText = 'Pinging...'
    versions.ping().then(pong => {
        pingButton.innerText = pong
    })
})

const showMenuButton = document.getElementById('show-menu')
showMenuButton.addEventListener('click', () => {
    versions.showMenu()
})
