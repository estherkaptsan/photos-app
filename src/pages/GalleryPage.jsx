import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import PhotoList from '../cpm/PhotoList';
import {
  loadPictures,
  removePicture,
  setFilterBy,
} from '../store/actions/picture.actions'

export default function GalleryPage(props) {

  // const pictures = useSelector((storeState) => storeState.pictureModule.pictures)
  const pictures = useSelector(state => state.gallery.pictures);

  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(loadPictures())
  }, [])

  if (!pictures) return <div>Loading...</div>
  return (
        <section className="gallery-page">
          <div className="container">
            <h2 className="section-title">Gallery</h2>
            <PhotoList pictures={pictures}/>
          </div>
        </section>
      )
}
