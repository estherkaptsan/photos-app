
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'



export const photoService = {
    query,
    getById,
    save,
    remove,
    getEmptyPhoto,
}
window.cs = photoService


async function query(filterBy = { category : '' }) {
    return httpService.get('photo', filterBy)
}
function getById(photoId) {
    return httpService.get(`photo/${photoId}`)
}

async function remove(photoId) {
    return httpService.delete(`photo/${photoId}`)
}
async function save(photo) {
    var savedPhoto
    if (photo._id) {
        savedPhoto = await httpService.put(`photo/${photo._id}`, photo)

    } else {
        savedPhoto = await httpService.post('photo', photo)
    }
    return savedPhoto
}



function getEmptyPhoto() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}





