import { Component, useEffect, useState } from 'react';
import { pictureService } from '../services/picture.service';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  loadPictures,
  removePicture,
  setFilterBy,
  loadCategories,
} from '../store/actions/picture.actions';

export function PhotoDetails(props) {
  console.log('photo details', props);
  const [photo, setPhoto] = useState(null);
  const [pictureIds, setPictureIds] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const pictures = useSelector(
    (storeState) => storeState.pictureModule.pictures
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPictures());
  }, [dispatch]);

  useEffect(() => {
    loadPicturesToNextPrev();
    loadPhoto();
  }, []);

  async function loadPicturesToNextPrev() {
    try {
      const ids = pictures.map((picture) => picture._id);
      console.log(ids);
      setPictureIds(ids);
    } catch (error) {
      console.log('error:', error);
    }
  }

  async function loadPhoto() {
    try {
      const photo = await pictureService.getPictureById(params.id);
      setPhoto(photo);
    } catch (error) {
      console.log('error:', error);
    }
  }

  function onBack() {
    navigate('/gallery');
  }

  function onNext() {
    const currentIndex = pictureIds.indexOf(params.id);
    const nextIndex = (currentIndex + 1) % pictureIds.length;
    navigate(`/photo/${pictureIds[nextIndex]}`);
    loadPhoto();
  }

  function onPrevious() {
    const currentIndex = pictureIds.indexOf(params.id);
    const previousIndex = (currentIndex - 1 + pictureIds.length) % pictureIds.length;
    navigate(`/photo/${pictureIds[previousIndex]}`);
    loadPhoto();
  }

  console.log('render');

  if (!photo) return <div>Loading...</div>;
  return (
    <section className="photo-details">
      <button onClick={onBack}>Back</button>
      <section>
        <h3>{photo.title}</h3>
        <div className="photo-container">
          <button onClick={onPrevious}>Previous</button>
          <img src={photo.imgUrl} />
          <button onClick={onNext}>Next</button>
        </div>
      </section>
    </section>
  );
}
