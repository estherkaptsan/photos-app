const photoService = require('./photo.service.js')

const logger = require('../../services/logger.service.js')

async function getPhotos(req, res) {
  try {
    logger.debug('Getting Photos')
    const filterBy = {
      category: req.query.category || ''
    }
    const photos = await photoService.query(filterBy)

    res.json(photos)
  } catch (err) {
    logger.error('Failed to get photos', err)
    res.status(500).send({ err: 'Failed to get photos' })
  }
}

async function getPhotoById(req, res) {
  try {
    const photoId = req.params.id
    const photo = await photoService.getById(photoId)
    res.json(photo)
  } catch (err) {
    logger.error('Failed to get photo', err)
    res.status(500).send({ err: 'Failed to get photo' })
  }
}

async function addPhoto(req, res) {
  const {loggedinUser} = req

  try {
    const photo = req.body
    const addedPhoto = await photoService.add(photo)
    res.json(addedPhoto)
  } catch (err) {
    logger.error('Failed to add photo', err)
    res.status(500).send({ err: 'Failed to add photo' })
  }
}


async function updatePhoto(req, res) {
  try {
    const photo = req.body
    const updatedPhoto = await photoService.update(photo)
    res.json(updatedPhoto)
  } catch (err) {
    logger.error('Failed to update photo', err)
    res.status(500).send({ err: 'Failed to update photo' })

  }
}

async function removePhoto(req, res) {
  try {
    const photoId = req.params.id
    const removedId = await photoService.remove(photoId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove photo', err)
    res.status(500).send({ err: 'Failed to remove photo' })
  }
}



async function removePhotoMsg(req, res) {
  const {loggedinUser} = req
  try {
    const photoId = req.params.id
    const {msgId} = req.params

    const removedId = await photoService.removePhotoMsg(photoId, msgId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove photo msg', err)
    res.status(500).send({ err: 'Failed to remove photo msg' })

  }
}

module.exports = {
  getPhotos,
  getPhotoById,
  addPhoto,
  updatePhoto,
  removePhoto,
}
