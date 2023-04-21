import { useDispatch } from 'react-redux';
import { func } from 'prop-types';

import Field from '../Field/Field';
import FieldArea from '../FieldArea/FieldArea';
import { changeFieldAd } from '../../store/reducers/ads';
import './FormAd.scss';

function FormAd({
  onSubmit,
  title,
  content,
  city,
  btnContent,
  postal_code,
  errors
}) {
  const dispatch = useDispatch();

  function handleChangeField(value, name) {
    dispatch(changeFieldAd({
      key: name,
      value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form className="formAd" onSubmit={handleSubmit}>
      <div className="formAd__field">
        <div className="line">
          <Field
            label="Titre*"
            name="title"
            placeholder="Titre de l'annonce"
            onChange={handleChangeField}
            form="ad"
            value={title}
          />
          {errors.title && <div className="formAd__error">{errors.title}</div>}
        </div>
        <div className="lineArea">
          <FieldArea
            label="Résumé de votre annonce*"
            name="content"
            placeholder="#Résumé de votre annonce
            &#10;#Animal concerné
            &#10;#Date.s souhaitée.s"
            onChange={handleChangeField}
            form="ad"
            value={content}
            limit="250"
          />
          {errors.content && <div className="formAd__error">{errors.content}</div>}
        </div>
        <div className="line">
          <Field
            label="Code postal*"
            name="postal_code"
            placeholder="Code postal"
            onChange={handleChangeField}
            form="ad"
            value={postal_code}
          />
          {errors.postal_code && <div className="formAd__error">{errors.postal_code}</div>}
        </div>
        <div className="line">
          <Field
            label="Ville*"
            name="city"
            placeholder="Ville"
            onChange={handleChangeField}
            form="ad"
            value={city}
          />
          {errors.city && <div className="formAd__error">{errors.city}</div>}
        </div>
      </div>

      <button type="submit" className="formAd__btn">{btnContent}</button>
    </form>
  );
}

export default FormAd;

FormAd.propTypes = {
  onSubmit: func.isRequired,
};
