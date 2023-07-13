import { useEffect, useState, useCallback } from 'react';
import { pictureService } from '../services/picture.service';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadPictures, } from '../store/actions/picture.actions';

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

      if (nextIndex)  {
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
    loadPhoto(nextPhoto); // Load the photo first
  }




  async function onPrevious(currentId) {
    const currentIndex = pictureIds.indexOf(currentId);
    const previousIndex = (currentIndex - 1 + pictureIds.length) % pictureIds.length;

    const prevPhoto= pictureIds[previousIndex]


    navigate(`/photo/${prevPhoto}`);
     loadPhoto(prevPhoto); // Load the photo first

  }


  if (!photo) return <div>Loading...</div>;
  return (
    <section className="photo-details">
      <button onClick={onBack}>Back</button>
      <section>
        <h3>{photo.title}</h3>
        <div className="photo-container">
          <button onClick={() => onPrevious(photo._id)}>Previous</button>
          <img src={photo.imgUrl} />
          <button onClick={() => onNext(photo._id)}>Next</button>
        </div>
      </section>
    </section>
  );
}
