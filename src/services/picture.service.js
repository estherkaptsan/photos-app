import { storageService } from './storage.service'

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
    "categories": "Image",
    "mediaUrl": { url: "http://unsplash.it/440/340", type: "image" },
    "title": "Puki"
  },
  {
    "_id": "1213",
    "categories": "Image",
    "mediaUrl": { url: "http://unsplash.it/470/340", type: "image" },
    "title": "Puki"
  },
  {
    "_id": "535",
    "categories": "Fashion",
    "mediaUrl": { url: "http://unsplash.it/469/340", type: "image" },
    "title": "Shmuki"
  },
  {
    "_id": "222",
    "categories": "Events",
    "mediaUrl": { url: "http://unsplash.it/420/340", type: "image" },
    "title": "Toki"
  },
  {
    "_id": "111",
    "categories": "Image",
    "mediaUrl": { url: "http://unsplash.it/450/340", type: "image" },
    "title": "Muki"
  },
  {
    "_id": "555",
    "categories": "Art",
    "mediaUrl": { url: "https://www.rd.com/wp-content/uploads/2020/04/GettyImages-1093840488-5-scaled.jpg", type: "image" },
    "title": "Park"
  },
  {
    "_id": "556",
    "categories": "Art",
    "mediaUrl": { url: "https://insideclimatenews.org/wp-content/uploads/2021/09/whanganui-river_matthew-lovette-education-images-universal-images-group-getty-scaled.jpg", type: "image" },
    "title": "River"
  },
  {
    "_id": "557",
    "categories": "Art",
    "mediaUrl": { url: "http://unsplash.it/480/340", type: "image" },
    "title": "Waterfall"
  },
  {
    "_id": "567",
    "categories": "Art",
    "mediaUrl": { url: "http://unsplash.it/490/340", type: "image" },
    "title": "cars"
  },
  {
    "_id": "587",
    "categories": "Art",
    "mediaUrl": { url: "http://unsplash.it/460/340", type: "image" },
    "title": "cars"
  },
  {
    "_id": "597",
    "categories": "Fashion",
    "mediaUrl": { url: "http://unsplash.it/540/340", type: "image" },
    "title": "sdfsdf"
  },
  {
    "_id": "599",
    "categories": "Fashion",
    "mediaUrl": { url: "http://unsplash.it/370/340", type: "image" },
    "title": "sfdsff"
  },
  {
    "_id": "558",
    "categories": "Art",
    "mediaUrl": { url: "https://parade.com/.image/t_share/MTkwNTgxMjMyNjM0ODMxOTk3/art-quotes.jpg", type: "image" },
    "title": "Fanan"
  },
  {
    "_id": "559",
    "categories": "Events",
    "mediaUrl": { url: "http://unsplash.it/470/340", type: "image" },
    "title": "Desk"
  },
  {
    "_id": "560",
    "categories": "Events",
    "mediaUrl": { url: "http://unsplash.it/490/340", type: "image" },
    "title": "Thinking"
  },
  {
    "_id": "561",
    "categories": "Art",
    "mediaUrl": { url: "http://unsplash.it/407/340", type: "image" },
    "title": "Thinking"
  },
  {
    "_id": "562",
    "categories": "Art",
    "mediaUrl": { url: "http://unsplash.it/270/350", type: "image" },
    "title": "Thinking"
  },
  {
    "_id": "563",
    "categories": "Image",
    "mediaUrl": { url: "http://unsplash.it/440/350", type: "image" },
    "title": "Thinking"
  }
];


 
var gPictures = _loadPictures()


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

async function getPictures(filterBy) {
  console.log(filterBy)
  
  const values = Object.values(filterBy);
  
  const str = values.join('');
  console.log(str)
  let picturesToReturn = gPictures
  // if (filterBy) {
    // var { categories } = filterBy
    if (str === 'ALL') {
      picturesToReturn = gPictures
    }
    else if (str){
      picturesToReturn = gPictures.filter(picture => str.includes(picture.categories))
    // }  

  }

  console.log(picturesToReturn)
  return Promise.resolve([...picturesToReturn])
};



function getPictureById(id) {
  return new Promise((resolve, reject) => {
    const picture = gPictures.find((picture) => picture._id === id)
    picture ? resolve(picture) : reject(`Picture id ${id} not found!`)
  })
}

function deletePicture(id) {
  const idx = gPictures.findIndex(picture => picture._id === id)
  gPictures.splice(idx, 1)

  storageService.store(STORAGE_KEY, gPictures)
  return Promise.resolve()
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
    picture._id = _makeId()
    gPictures.unshift(picture)
    storageService.store(STORAGE_KEY, gPictures)
    resolve(picture)
  })
}

function _loadPictures() {
  let pictures = storageService.load(STORAGE_KEY)
  if (!pictures || !pictures.length) pictures = gDefaultPictures
  storageService.store(STORAGE_KEY, pictures)
  return pictures
}


function getCategories() {
  let categories = _loadPictures();
  let uniqueCategories = [...new Set(categories.map((picture) => picture.categories))];
  uniqueCategories.unshift("ALL"); // Add "ALL" as the first element
  return uniqueCategories;
}




function savePicture(picture) {
  return picture._id ? _updatePicture(picture) : _addPicture(picture)
}

function getEmptyPicture() {
  return {
    title: '',
    mediaurl: '',
    // type: '',
    categories: '',
  }
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
