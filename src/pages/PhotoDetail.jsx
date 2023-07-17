import { useEffect, useState, useCallback } from 'react';
import { pictureService } from '../services/picture.service';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadPictures } from '../store/actions/picture.actions';

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
    loadPictureIds();
    loadPhoto();
  }, []);

  const isVideo = photo && photo.mediaUrl && photo.mediaUrl.type === 'video';
  console.log('isVideo', isVideo) 

  async function loadPictureIds() {
    try {
      const ids = pictures.map((picture) => picture._id);
      console.log(ids);
      setPictureIds(ids);
    } catch (error) {
      console.log('error:', error);
    }
  }

  async function loadPhoto(nextIndex) {
    let photo = ''
    try {

      if (nextIndex) {
        photo = await pictureService.getPictureById(nextIndex);
      }

      else {

        photo = await pictureService.getPictureById(params.id);
      }
      setPhoto(photo);
    } catch (error) {
      console.log('error:', error);
    }
  }

  function onBack() {
    navigate('/gallery');
  }

  async function onNext(currentId) {
    const currentIndex = pictureIds.indexOf(currentId);
    const nextIndex = (currentIndex + 1) % pictureIds.length;
    const nextPhoto = pictureIds[nextIndex]
    navigate(`/photo/${nextPhoto}`);
    loadPhoto(nextPhoto);
  }




  async function onPrevious(currentId) {
    const currentIndex = pictureIds.indexOf(currentId);
    const previousIndex = (currentIndex - 1 + pictureIds.length) % pictureIds.length;

    const prevPhoto = pictureIds[previousIndex]


    navigate(`/photo/${prevPhoto}`);
    loadPhoto(prevPhoto);
  }


  if (!photo) return <div>Loading...</div>;
  return (
    <section className="photo-details">
    <i class="fa-solid fa-xmark da" onClick={onBack}></i>
      <section>
        {/* <h3>{photo.title}</h3> */}
        <div className="photo-container">
        <i class="fa-solid fa-chevron-left da"  onClick={() => onPrevious(photo._id)}></i>   
          {isVideo ? (
            <video controls src={photo.mediaUrl.url} alt={photo.title} />
          ) : (
            <img className='details-pic' src={photo.mediaUrl.url} alt={photo.title} />
          )}
          <i className="fa-solid fa-chevron-right da" onClick={() => onNext(photo._id)}></i>
        </div>
      </section>
    </section>
  );
}
