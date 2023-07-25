const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getPhotos, getPhotoById, addPhoto, updatePhoto, removePhoto, addPhotoMsg, removePhotoMsg } = require('./photo.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getPhotos)
router.get('/:id', getPhotoById)
router.post('/', addPhoto)
router.put('/:id', updatePhoto)
router.delete('/:id', removePhoto)
// router.delete('/:id', requireAuth, requireAdmin, removePhoto)

router.post('/:id/msg', requireAuth, addPhotoMsg)
router.delete('/:id/msg/:msgId', requireAuth, removePhotoMsg)

module.exports = router