import { useEffect, useState, useCallback } from 'react';
import { pictureService } from '../services/picture.service';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress'
import { loadPictures, removePicture, setFilterBy, loadCategories } from '../store/actions/picture.actions';


export function PhotoDetails(props) {
  // console.log('photo details', props);
  const [photo, setPhoto] = useState(null);
  const [pictureIds, setPictureIds] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const pictures = useSelector((storeState) => storeState.pictureModule.pictures);
  const dispatch = useDispatch();
  const filterBy = useSelector((storeState) => storeState.pictureModule.filterBy);



  // console.log('photo',photo)


  useEffect(() => {
    dispatch(loadPictures());
  }, [dispatch]);

  useEffect(() => {
    loadPictureIds();
    loadPhoto();
  }, []);

  if (photo) {

    const { category } = photo
  }
  const onChangeFilter = useCallback(

    (category) => {
      dispatch(setFilterBy({ ...filterBy, category: category }));
      dispatch(loadPictures());
    },
    [dispatch, filterBy]
  );

  const isVideo = photo && photo.mediaUrl && photo.mediaUrl.type === 'video';

  async function loadPictureIds() {
    try {
      const ids = pictures.map((picture) => picture._id);
      setPictureIds(ids);
    } catch (error) {
      console.log('error:', error);
    }
  }

  async function loadPhoto(nextIndex) {
    let photo = '';
    try {
      if (nextIndex) {
        photo = await pictureService.getPictureById(nextIndex);
      } else {
        photo = await pictureService.getPictureById(params.id);
      }
      setPhoto(photo);
    } catch (error) {
      console.log('error:', error);
    }
  }

  function onBack() {
    navigate(`/gallery/${photo.category}`);
  }

  async function onNext(currentId) {
    const currentIndex = pictureIds.indexOf(currentId);
    const nextIndex = (currentIndex + 1) % pictureIds.length;
    const nextPhoto = pictureIds[nextIndex];
    navigate(`/photo/${nextPhoto}`);
    loadPhoto(nextPhoto);
  }

  async function onPrevious(currentId) {
    const currentIndex = pictureIds.indexOf(currentId);
    const previousIndex = (currentIndex - 1 + pictureIds.length) % pictureIds.length;
    const prevPhoto = pictureIds[previousIndex];
    navigate(`/photo/${prevPhoto}`);
    loadPhoto(prevPhoto);
  }


  let touchStartX = 0;

  const handleTouchStart = (event) => {
    touchStartX = event.touches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    const touchEndX = event.changedTouches[0].clientX;
    const touchDelta = touchEndX - touchStartX;

    if (touchDelta > 0) {
      onPrevious(photo._id);
    } else if (touchDelta < 0) {
      onNext(photo._id);
    }
  };

  if (!photo) return <CircularProgress />

  return (
    <section className="photo-details">
      <Link
        to={`/gallery/${encodeURIComponent(photo.category)}`}
        onClick={() => onChangeFilter(photo.category)}>
        <i className="fa-solid fa-xmark" ></i>
      </Link>
      <section>
        <div
          className="photo-container"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <i className="fa-solid fa-chevron-left arrow-btn" onClick={() => onPrevious(photo?._id)}></i>
          {isVideo ? (
            <video controls src={photo?.mediaUrl?.url} alt={photo?.title} />
          ) : (
            <img className="details-pic" src={photo?.mediaUrl?.url} alt={photo.title} />
          )}
          <i className="fa-solid fa-chevron-right arrow-btn" onClick={() => onNext(photo?._id)}></i>
        </div>
      </section>
    </section>
  );
}
