import { MdDeleteForever, MdEditNote, MdPlace } from 'react-icons/md';
import { string, number } from 'prop-types';
import { useState } from 'react';

import './MyAdCard.scss';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOneAd, getMyAds, updateAd } from '../../../api/ads';
import FormAd from '../../../components/FormAd/FormAd';
import { saveAdInfos } from '../../../store/reducers/ads';
import { schemas } from '../../../validation/ad.schemas';

function MyAdCard({
  adCardId,
  adCardTitle,
  adCardContent,
  adCardCity,
  adCardPostalCode,
  adCardCreatedAt,
}) {
  const dispatch = useDispatch();

  const [cardUpdateInProgress, setCardUpdateInProgress] = useState(false);

  const date = new Date(adCardCreatedAt);

  const [confirmDelete, setConfirmDelete] = useState(false);

  function handleConfirmDeleteAd() {
    setConfirmDelete(true);
    const timer = setTimeout(() => {
      setConfirmDelete(false);
    }, 6000);
    return () => clearTimeout(timer);
  }

  function handleClickDeleteAd() {
    dispatch(deleteOneAd(adCardId));
    dispatch(getMyAds());
  }

  function handleClickUpdateAd() {
    const dataToUpdate = {
      title: adCardTitle,
      content: adCardContent,
      city: adCardCity,
      postal_code: adCardPostalCode,
    };
    dispatch(saveAdInfos(dataToUpdate));
    setCardUpdateInProgress(true);
  }

  const {
    title,
    content,
    city,
    postal_code,
  } = useSelector((state) => state.ads);

  const [errors, setErrors] = useState({}); // pour la gestion des erreurs

  function handleSubmitFormUpdateAd() {
    // Tests de validation avec Joi
    const validationErrors = schemas.validate({
      title,
      content,
      city,
      postal_code,
    }, { abortEarly: false }).error;

    // Affichage des erreurs à l'utilisateur
    if (validationErrors) {
      // console.log('erreurs de validation', validationErrors);
      // Si il y a des erreurs, on les stocke dans un objet
      const newErrors = {};
      validationErrors.details.forEach((error) => {
        newErrors[error.path[0]] = error.message;
      });
      setErrors(newErrors);
    } else {
      dispatch(updateAd(adCardId));
      dispatch(getMyAds());
      setCardUpdateInProgress(false);
    }
  }

  return (
    <article className="myAdCard">
      {cardUpdateInProgress
        ? (
          <FormAd
            title={title}
            content={content}
            city={city}
            postal_code={postal_code}
            btnContent="Modifier mon annonce"
            errors={errors}
            onSubmit={handleSubmitFormUpdateAd}
          />
        )
        : (
          <>
            <header className="myAdCard__header">
              <section className="myAdCard__header__description">
                <h3 className="myAdCard__header__description__title">{adCardTitle}</h3>
                <p className="myAdCard__header__description__localisation">
                  <MdPlace size="1.5rem" />
                  {`${adCardCity} - ${adCardPostalCode}`}
                </p>
                <p className="myAdCard__header__description__date">
                  Posté le :
                  {' '}
                  <span>
                    {date.toLocaleDateString()}
                  </span>
                </p>
              </section>

              <section className="myAdCard__header__btns">
                <MdEditNote size="2.3rem" onClick={handleClickUpdateAd} />
                {confirmDelete
                  ? (
                    <div className="myAdCard__header__btns--delete">
                      <MdDeleteForever size="2.4rem" onClick={handleClickDeleteAd} />
                    </div>
                  )
                  : <MdDeleteForever size="2.4rem" onClick={handleConfirmDeleteAd} />}
              </section>

              <section className="myAdCard__header__btns--desktop">
                <button
                  type="button"
                  onClick={handleClickUpdateAd}
                >
                  <MdEditNote size="1.8rem" />
                  <p>Modifier</p>
                </button>
                {confirmDelete
                  ? (
                    <button
                      type="button"
                      className="myAdCard__header__btns--desktop--delete"
                      onClick={handleClickDeleteAd}
                    >
                      <MdDeleteForever size="1.8rem" />
                      <p>Valider</p>
                    </button>
                  )
                  : (
                    <button
                      type="button"
                      onClick={handleConfirmDeleteAd}
                    >
                      <MdDeleteForever size="1.8rem" />
                      <p>Supprimer</p>
                    </button>
                  ) }
              </section>
            </header>

            <p className="myAdCard__content">
              {adCardContent}
            </p>
          </>
        )}

    </article>
  );
}

export default MyAdCard;

MyAdCard.propTypes = {
  adCardId: number.isRequired,
  adCardTitle: string.isRequired,
  adCardContent: string.isRequired,
  adCardCity: string.isRequired,
  adCardPostalCode: string.isRequired,
  adCardCreatedAt: string.isRequired,
};
