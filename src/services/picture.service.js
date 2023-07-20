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
    "categories": "Children",
    "mediaUrl": { url: "http://unsplash.it/440/340", type: "image" },
  },
  {
    "_id": "1213",
    "categories": "coffe",
    "mediaUrl": { url: "http://unsplash.it/470/340", type: "image" },
  },
  {
    "_id": "535",
    "categories": "Home",
    "mediaUrl": { url: "http://unsplash.it/469/340", type: "image" },
  },
  {
    "_id": "222",
    "categories": "Work",
    "mediaUrl": { url: "http://unsplash.it/420/340", type: "image" },
  },
  {
    "_id": "111",
    "categories": "Children",
    "mediaUrl": { url: "http://unsplash.it/450/340", type: "image" },
  },
  {
    "_id": "555",
    "categories": "nature",
    "mediaUrl": { url: "https://www.rd.com/wp-content/uploads/2020/04/GettyImages-1093840488-5-scaled.jpg", type: "image" },
  },
  {
    "_id": "556",
    "categories": "nature",
    "mediaUrl": { url: "https://insideclimatenews.org/wp-content/uploads/2021/09/whanganui-river_matthew-lovette-education-images-universal-images-group-getty-scaled.jpg", type: "image" },
  },
  {
    "_id": "557",
    "categories": "nature",
    "mediaUrl": { url: "https://www.discover-the-world.com/app/uploads/2020/05/south-west-iceland-seljalandsfoss-pink-sky-robert-lukeman-unsplash-800x0-c-default.jpg", type: "image" },
  },
  {
    "_id": "567",
    "categories": "nature",
    "mediaUrl": { url: "https://www.discover-the-world.com/app/uploads/2020/05/south-west-iceland-seljalandsfoss-pink-sky-robert-lukeman-unsplash-800x0-c-default.jpg", type: "image" },
  },
  {
    "_id": "587",
    "categories": "nature",
    "mediaUrl": { url: "https://www.discover-the-world.com/app/uploads/2020/05/south-west-iceland-seljalandsfoss-pink-sky-robert-lukeman-unsplash-800x0-c-default.jpg", type: "image" },
  },
  {
    "_id": "597",
    "categories": "photos",
    "mediaUrl": { url: "https://www.discover-the-world.com/app/uploads/2020/05/south-west-iceland-seljalandsfoss-pink-sky-robert-lukeman-unsplash-800x0-c-default.jpg", type: "image" },
  },
  {
    "_id": "599",
    "categories": "photos",
    "mediaUrl": { url: "https://www.discover-the-world.com/app/uploads/2020/05/south-west-iceland-seljalandsfoss-pink-sky-robert-lukeman-unsplash-800x0-c-default.jpg", type: "image" },
  },
  {
    "_id": "558",
    "categories": "nature",
    "mediaUrl": { url: "https://parade.com/.image/t_share/MTkwNTgxMjMyNjM0ODMxOTk3/nature-quotes.jpg", type: "image" },
  },
  {
    "_id": "559",
    "categories": "Work",
    "mediaUrl": { url: "https://api.time.com/wp-content/uploads/2021/02/laptop-Home-office.jpg", type: "image" },
  },
  {
    "_id": "560",
    "categories": "Work",
    "mediaUrl": { url: "https://media.newyorker.com/photos/6222af6bed7fe93395914e83/master/w_2560%2Cc_limit/Harrington-IDoNotLikeWork.jpg", type: "image" },
  },
  {
    "_id": "561",
    "categories": "sport",
    "mediaUrl": { url: "https://media.newyorker.com/photos/6222af6bed7fe93395914e83/master/w_2560%2Cc_limit/Harrington-IDoNotLikeWork.jpg", type: "image" },
  },
  {
    "_id": "562",
    "categories": "sport",
    "mediaUrl": { url: "https://media.newyorker.com/photos/6222af6bed7fe93395914e83/master/w_2560%2Cc_limit/Harrington-IDoNotLikeWork.jpg", type: "image" },
  },
  {
    "_id": "563",
    "categories": "coffe",
    "mediaUrl": { url: "https://media.newyorker.com/photos/6222af6bed7fe93395914e83/master/w_2560%2Cc_limit/Harrington-IDoNotLikeWork.jpg", type: "image" },
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
  // uniqueCategories.unshift("ALL"); // Add "ALL" as the first element
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
