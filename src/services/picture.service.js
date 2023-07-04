export const pictureService = {
    getPictures,
    getPictureById,
    deletePicture,
    savePicture,
    getEmptyPicture,
  }
  
  const pictures = [
    {
        "_id": "123",
        "categories": "children",
        "imgUrl": "http://unsplash.it/460/340",
        "title": ""
    },
    {
        "_id": "535",
        "categories": "home",
        "imgUrl": "http://unsplash.it/460/340",
        "title": ""
    },
    {
        "_id": "222",
        "categories": "work",
        "imgUrl": "http://unsplash.it/460/340",
        "title": ""
    },
    {
        "_id": "111",
        "categories": "children",
        "imgUrl": "http://unsplash.it/460/340",
        "title": ""
    }
  ]

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
  
  function getPictures(filterBy = null) {
    return new Promise((resolve, reject) => {
      var picturesToReturn = pictures
      // if (filterBy && (filterBy.title || filterBy.categories)) {
      //   picturesToReturn = pictures.filter((picture) => {
      //     if (filterBy.title) {
      //       return false
      //     }
      //     if (
      //       filterBy.categories.toString()
      //         .toLowerCase()
      //         .includes(filterBy.categories.toString().toLowerCase())
      //     ) {
      //       return false
      //     }
      //     return true
      //   })
      // }
      resolve(picturesToReturn)
    })
  }
  
  function getPictureById(id) {
    return new Promise((resolve, reject) => {
      const picture = pictures.find((picture) => picture._id === id)
      picture ? resolve(picture) : reject(`Picture id ${id} not found!`)
    })
  }
  
  function deletePicture(id) {
    console.log('id from service', id)
    return new Promise((resolve, reject) => {
      const index = pictures.findIndex((picture) => picture._id === id)
      if (index !== -1) {
        pictures.splice(index, 1)
      }
      resolve(pictures)
    })
  }
  
  function _updatePicture(picture) {
    return new Promise((resolve, reject) => {
      const index = pictures.findIndex((c) => picture._id === c._id)
      if (index !== -1) {
        pictures[index] = picture
      }
      resolve(picture)
    })
  }
  
  function _addPicture(picture) {
    return new Promise((resolve, reject) => {
      picture._id = _makeId()
      pictures.unshift(picture)
      resolve(picture)
    })
  }
  
  function savePicture(picture) {
    return picture._id ? _updatePicture(picture) : _addPicture(picture)
  }
  
  function getEmptyPicture() {
    return {
      title: '',
      imgurl: '',
      categories: '',
    }
  }
  
  function filter(term) {
    term = term.toLocaleLowerCase()
    return pictures.filter((picture) => {
      return (
        picture.title.toLocaleLowerCase().includes(term) ||
        picture.categories.toLocaleLowerCase().includes(term) ||
        picture.imgurl.toLocaleLowerCase().includes(term)
      )
    })
  }
  
  function _makeId(length = 10) {
    var txt = ''
    var possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
      txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
  }
  