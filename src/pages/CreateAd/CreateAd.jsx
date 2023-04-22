import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createAd } from '../../api/ads';
import FormAd from '../../components/FormAd/FormAd';
import './CreateAd.scss';
import { schemas } from '../../validation/ad.schemas';

function CreateAd() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    title,
    content,
    city,
    postal_code,
  } = useSelector((state) => state.ads);

  const [errors, setErrors] = useState({}); // pour la gestion des erreurs

  function handleSubmitFormCreateAd() {
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
      dispatch(createAd());
      navigate('/mes-annonces');
      setErrors({});
    }
  }

  return (
    <main className="createAd">
      <h2 className="createAd__title">Créer une annonce</h2>
      <p className="createAd__description">
        Créez ici votre annonce détaillée
        de recherche d’un Petsitter
        pour votre animal
      </p>
      <FormAd
        title={title}
        content={content}
        city={city}
        postal_code={postal_code}
        btnContent="Poster mon annonce"
        errors={errors}
        onSubmit={handleSubmitFormCreateAd}
      />
    </main>
  );
}

export default CreateAd;
