const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy={txt:''}) {
    try {
        const criteria = {
            vendor: { $regex: filterBy.txt, $options: 'i' }
        }
        const collection = await dbService.getCollection('photo')
        var photos = await collection.find(criteria).toArray()
        return photos
    } catch (err) {
        logger.error('cannot find photos', err)
        throw err
    }
}

async function getById(photoId) {
    try {
        const collection = await dbService.getCollection('photo')
        const photo = collection.findOne({ _id: ObjectId(photoId) })
        return photo
    } catch (err) {
        logger.error(`while finding photo ${photoId}`, err)
        throw err
    }
}

async function remove(photoId) {
    try {
        const collection = await dbService.getCollection('photo')
        await collection.deleteOne({ _id: ObjectId(photoId) })
        return photoId
    } catch (err) {
        logger.error(`cannot remove photo ${photoId}`, err)
        throw err
    }
}

async function add(photo) {
    try {
        const collection = await dbService.getCollection('photo')
        await collection.insertOne(photo)
        return photo
    } catch (err) {
        logger.error('cannot insert photo', err)
        throw err
    }
}

async function update(photo) {
    try {
        const photoToSave = {
            vendor: photo.vendor,
            price: photo.price
        }
        const collection = await dbService.getCollection('photo')
        await collection.updateOne({ _id: ObjectId(photo._id) }, { $set: photoToSave })
        return photo
    } catch (err) {
        logger.error(`cannot update photo ${photoId}`, err)
        throw err
    }
}

async function addPhotoMsg(photoId, msg) {
    try {
        msg.id = utilService.makeId()
        const collection = await dbService.getCollection('photo')
        await collection.updateOne({ _id: ObjectId(photoId) }, { $push: { msgs: msg } })
        return msg
    } catch (err) {
        logger.error(`cannot add photo msg ${photoId}`, err)
        throw err
    }
}

async function removePhotoMsg(photoId, msgId) {
    try {
        const collection = await dbService.getCollection('photo')
        await collection.updateOne({ _id: ObjectId(photoId) }, { $pull: { msgs: {id: msgId} } })
        return msgId
    } catch (err) {
        logger.error(`cannot add photo msg ${photoId}`, err)
        throw err
    }
}

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
    addPhotoMsg,
    removePhotoMsg
}
