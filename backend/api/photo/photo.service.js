const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy) {
    try {
        const criteria = _buildCriteria(filterBy);
        
        const collection = await dbService.getCollection('photo');
        console.log('collection',collection)
        const photos = await collection.find(criteria).toArray()
        console.log('photos from query', photos)
        return photos;
    } catch (err) {
        logger.error('cannot find photos', err);
        throw err;
    }
}


async function getById(photoId) {
    try {
        const collection = await dbService.getCollection('photo')
        console.log('collection-------------------------------------------------------', collection) 
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



function _buildCriteria(filterBy = {  category: null}) {
    const {  category } = filterBy
console.log('category',category)
console.log('filterBy',filterBy)
    const criteria = {}

    if (category) {
        criteria.category = { $in: [category] };
    }

    return criteria
}


module.exports = {
    remove,
    query,
    getById,
    add,
    update,
}
