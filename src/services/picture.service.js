import { storageService } from './async-storage.service'
// import { httpService } from './http.service.js'
import { storageServiceB } from './storage.service';

export const pictureService = {
  getPictures,
  getPictureById,
  deletePicture,
  savePicture,
  getEmptyPicture,
  getCategories
}
const STORAGE_KEY = 'PhotoDB'
const gDefaultPictures = [
  {
    "_id": "123",
    "category": "Image",
    "mediaUrl": { url: "http://unsplash.it/440/340", type: "image" },
  },
  {
    "_id": "1213",
    "category": "Image",
    "mediaUrl": { url: "http://unsplash.it/470/340", type: "image" },
  },
  {
    "_id": "535",
    "category": "Fashion",
    "mediaUrl": { url: "http://unsplash.it/469/340", type: "image" },
  },
  {
    "_id": "222",
    "category": "Events",
    "mediaUrl": { url: "http://unsplash.it/420/340", type: "image" },
  },
  {
    "_id": "111",
    "category": "Image",
    "mediaUrl": { url: "http://unsplash.it/450/340", type: "image" },
  },
  {
    "_id": "555",
    "category": "Art",
    "mediaUrl": { url: "https://www.rd.com/wp-content/uploads/2020/04/GettyImages-1093840488-5-scaled.jpg", type: "image" },
  },
  {
    "_id": "556",
    "category": "Art",
    "mediaUrl": { url: "https://insideclimatenews.org/wp-content/uploads/2021/09/whanganui-river_matthew-lovette-education-images-universal-images-group-getty-scaled.jpg", type: "image" },
  },
  {
    "_id": "557",
    "category": "Art",
    "mediaUrl": { url: "http://unsplash.it/480/340", type: "image" },
  },
  {
    "_id": "567",
    "category": "Art",
    "mediaUrl": { url: "http://unsplash.it/490/340", type: "image" },
  },
  {
    "_id": "587",
    "category": "Art",
    "mediaUrl": { url: "http://unsplash.it/460/340", type: "image" },
  },
  {
    "_id": "597",
    "category": "Fashion",
    "mediaUrl": { url: "http://unsplash.it/540/340", type: "image" },
  },
  {
    "_id": "599",
    "category": "Fashion",
    "mediaUrl": { url: "http://unsplash.it/370/340", type: "image" },
  },
  {
    "_id": "558",
    "category": "Art",
    "mediaUrl": { url: "https://parade.com/.image/t_share/MTkwNTgxMjMyNjM0ODMxOTk3/art-quotes.jpg", type: "image" },
  },
  {
    "_id": "559",
    "category": "Events",
    "mediaUrl": { url: "http://unsplash.it/470/340", type: "image" },
  },
  {
    "_id": "560",
    "category": "Events",
    "mediaUrl": { url: "http://unsplash.it/490/340", type: "image" },
  },
  {
    "_id": "561",
    "category": "Art",
    "mediaUrl": { url: "http://unsplash.it/407/340", type: "image" },
  },
  {
    "_id": "562",
    "category": "Art",
    "mediaUrl": { url: "http://unsplash.it/270/350", type: "image" },
  },
  {
    "_id": "563",
    "category": "Image",
    "mediaUrl": { url: "http://unsplash.it/440/350", type: "image" },
  }
];

var gPictures = _loadPictures()


async function getPictures(filterBy) {

  // return httpService.get(STORAGE_KEY, filterBy)

  const values = Object.values(filterBy);

  const str = values.join('');
  console.log(str)
  let picturesToReturn = gPictures

  if (str === 'ALL') {
    picturesToReturn = gPictures
  }
  else if (str) {
    picturesToReturn = gPictures.filter(picture => str.includes(picture.category))


  }

  console.log(picturesToReturn)
  return Promise.resolve([...picturesToReturn])


};



function getPictureById(pictureId) {

  // return httpService.get(`picture/${pictureId}`)
  return storageService.get(STORAGE_KEY, pictureId)

  // return new Promise((resolve, reject) => {
  //   const picture = gPictures.find((picture) => picture._id === id)
  //   picture ? resolve(picture) : reject(`Picture id ${id} not found!`)
  // })
}

async function savePicture(picture) {
  var savedpicture
  if (picture._id) {
    savedpicture = await storageService.put(STORAGE_KEY, picture)
    //     savedpicture = await httpService.put(`picture/${picture._id}`, picture)

  } else {
    savedpicture = await storageService.post(STORAGE_KEY, picture)
    //     savedpicture = await httpService.post('picture', picture)
  }
  return savedpicture

  // return picture._id ? _updatePicture(picture) : _addPicture(picture)
}

async function deletePicture(pictureId) {
  // return httpService.delete(`picture/${pictureId}`)

  await storageService.remove(STORAGE_KEY, pictureId)
  // const idx = gPictures.findIndex(picture => picture._id === id)
  // gPictures.splice(idx, 1)

  // storageServiceB.store(STORAGE_KEY, gPictures)
  // return Promise.resolve()
}

function _updatePicture(picture) {
  return new Promise((resolve, reject) => {
    const index = gPictures.findIndex((c) => picture._id === c._id)
    if (index !== -1) {
      gPictures[index] = picture
    }
    resolve(picture)
  })
}

function _addPicture(picture) {
  return new Promise((resolve, reject) => {
    picture._id = _makeId();
    gPictures.push(picture); // Directly add the picture object to the array
    storageServiceB.store(STORAGE_KEY, gPictures);
    resolve(picture);
  });
}




function _loadPictures() {
  let pictures = storageServiceB.load(STORAGE_KEY)
  if (!pictures || !pictures.length) pictures = gDefaultPictures
  storageServiceB.store(STORAGE_KEY, pictures)
  return pictures
}


function getCategories() {
  let categories = _loadPictures();
  let uniqueCategories = [...new Set(categories.map((picture) => picture.category))];
  // uniqueCategories.unshift("ALL"); // Add "ALL" as the first element
  return uniqueCategories;
}


function sort(arr) {
  return arr.sort((a, b) => {
    if (a.title.toLocaleLowerCase() < b.title.toLocaleLowerCase()) {
      return -1
    }
    if (a.title.toLocaleLowerCase() > b.title.toLocaleLowerCase()) {
      return 1
    }

    return 0
  })
}





function getEmptyPicture() {
  return {
    mediaUrl: '', // Fix the property name here
    category: '',
  };
}


function filter(term) {
  term = term.toLocaleLowerCase()
  return gPictures.filter((picture) => {
    return (
      picture.title.toLocaleLowerCase().includes(term) ||
      picture.categories.toLocaleLowerCase().includes(term) ||
      picture.mediaurl.toLocaleLowerCase().includes(term)
    )
  })
}

function _makeId(length = 10) {
  var title = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++) {
    title += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return title
}
