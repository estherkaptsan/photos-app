import { photoService } from './services/photo.service.js'
import { userService } from './services/user.service.js'
import { utilService } from './services/util.service.js'

console.log('Simple driver to test some API calls')

window.onLoadPhotos = onLoadPhotos
window.onLoadUsers = onLoadUsers
window.onAddPhoto = onAddPhoto
window.onGetPhotoById = onGetPhotoById
window.onRemovePhoto = onRemovePhoto
window.onAddPhotoMsg = onAddPhotoMsg

async function onLoadPhotos() {
    const photos = await photoService.query()
    render('Photos', photos)
}
async function onLoadUsers() {
    const users = await userService.query()
    render('Users', users)
}

async function onGetPhotoById() {
    const id = prompt('Photo id?')
    if (!id) return
    const photo = await photoService.getById(id)
    render('Photo', photo)
}

async function onRemovePhoto() {
    const id = prompt('Photo id?')
    if (!id) return
    await photoService.remove(id)
    render('Removed Photo')
}

async function onAddPhoto() {
    await userService.login({ username: 'muki', password: '123' })
    const savedPhoto = await photoService.save(photoService.getEmptyPhoto())
    render('Saved Photo', savedPhoto)
}

async function onAddPhotoMsg() {
    await userService.login({ username: 'muki', password: '123' })
    const id = prompt('Photo id?')
    if (!id) return

    const savedMsg = await photoService.addPhotoMsg(id, 'some msg')
    render('Saved Msg', savedMsg)
}

function render(title, mix = '') {
    console.log(title, mix)
    const output = utilService.prettyJSON(mix)
    document.querySelector('h2').innerText = title
    document.querySelector('pre').innerHTML = output
}

