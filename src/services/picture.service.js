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
        "categories": "Children",
        "imgUrl": "http://unsplash.it/460/340",
        "title": "Puki"
    },
    {
        "_id": "535",
        "categories": "Home",
        "imgUrl": "http://unsplash.it/460/340",
        "title": "Shmuki"
    },
    {
        "_id": "222",
        "categories": "Work",
        "imgUrl": "http://unsplash.it/460/340",
        "title": "Toki"
    },
    {
        "_id": "111",
        "categories": "Children",
        "imgUrl": "http://unsplash.it/460/340",
        "title": "Muki"
    },
    {
        "_id": "555",
        "categories": "nature",
        "imgUrl": "https://www.rd.com/wp-content/uploads/2020/04/GettyImages-1093840488-5-scaled.jpg",
        "title": "Park"
    },
    {
        "_id": "556",
        "categories": "nature",
        "imgUrl": "https://insideclimatenews.org/wp-content/uploads/2021/09/whanganui-river_matthew-lovette-education-images-universal-images-group-getty-scaled.jpg",
        "title": "River"
    },
    {
        "_id": "557",
        "categories": "nature",
        "imgUrl": "https://www.discover-the-world.com/app/uploads/2020/05/south-west-iceland-seljalandsfoss-pink-sky-robert-lukeman-unsplash-800x0-c-default.jpg",
        "title": "Waterfall"
    },
    {
        "_id": "558",
        "categories": "nature",
        "imgUrl": "https://parade.com/.image/t_share/MTkwNTgxMjMyNjM0ODMxOTk3/nature-quotes.jpg",
        "title": "Fanan"
    },
    {
        "_id": "559",
        "categories": "Work",
        "imgUrl": "https://api.time.com/wp-content/uploads/2021/02/laptop-Home-office.jpg",
        "title": "Desk"
    },
    {
        "_id": "560",
        "categories": "Work",
        "imgUrl": "https://media.newyorker.com/photos/6222af6bed7fe93395914e83/master/w_2560%2Cc_limit/Harrington-IDoNotLikeWork.jpg",
        "title": "Thinking"
    },

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
        var picturesToReturn = pictures;
        if (filterBy && filterBy.term) {
            picturesToReturn = filter(filterBy.term)
        }
        resolve(sort(picturesToReturn))
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
  