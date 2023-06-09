import { string, number, arrayOf } from 'prop-types';
import { MdPlace } from 'react-icons/md';
import { Link } from 'react-router-dom';

import PetIcon from '../../../components/PetIcon/PetIcon';
import './PetsitterCard.scss';

function PetsitterCard({
  id, nom, prenom, ville, codePostal, description, animauxAcceptes, email,
}) {
  const isLogged = localStorage.getItem('isLogged');
  console.log('isLogged >> ', isLogged);
  return (
    <div className="petsitter__card">
      <div className="petsitter__card__main">
        <div className="petsitter__card__header">
          <h1 className="petsitter__card__title">
            {/* la fonction array.from permet d'obtenir la lettre à l'index 0 (ex : Dupont -> D.) */ }
            {`${prenom} ${Array.from(nom)[0]}.`}
          </h1>
          <div className="petsitter__card__location">
            <MdPlace size="20" className="petsitter__card__location__icon" />
            <p className="petsitter__card__location__city">{`${ville} - ${codePostal}`}</p>
          </div>
        </div>
        <p className="petsitter__card__description">{description}</p>
        <ul> Je peux garder :</ul>
        <div className="petsitter__card__peticon">
          {animauxAcceptes.map((animal) => (
            <PetIcon key={animal} pet={animal} />
          ))}

        </div>
      </div>

      {isLogged
        ? (
          <div className="petsitter__card__buttons">
            <Link
              to={`/profil/${id}`}
            >
              <button
                type="button"
                className="petsitter__card__buttons__details"
              >
                voir le profil
              </button>
            </Link>
            <Link
              to={`mailto:${email}`}
            >
              <button
                type="button"
                className="petsitter__card__buttons__contact"
              >
                contacter
              </button>
            </Link>
          </div>
        )
        : (
          <div className="petsitter__card__buttons">
            <Link
              to="/identification"
            >
              <button
                type="button"
                className="petsitter__card__buttons__details"
              >
                voir le profil
              </button>
            </Link>
            <Link
              to="/identification"
            >
              <button
                type="button"
                className="petsitter__card__buttons__contact"
              >
                contacter
              </button>
            </Link>
          </div>
        )}
    </div>
  );
}

export default PetsitterCard;

PetsitterCard.propTypes = {
  id: number.isRequired,
  nom: string.isRequired,
  prenom: string.isRequired,
  ville: string.isRequired,
  codePostal: number.isRequired,
  description: string.isRequired,
  animauxAcceptes: arrayOf(string).isRequired,
  email: string.isRequired,
};
