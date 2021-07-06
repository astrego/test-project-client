import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

const Home = ({ restaurants, error }) => {
  return (
    <ul>
      {restaurants.map((restaurant) => (
        <li key={restaurant.id}>
          {restaurant.name} : {restaurant.description}
        </li>
      ))}
    </ul>
  );
};

Home.getInitialProps = async (ctx) => {
  try {
    const parseJSON = (resp) => (resp.json ? resp.json() : resp);

    const checkStatus = (resp) => {
      if (resp.status >= 200 && resp.status < 300) {
        return resp;
      }

      return parseJSON(resp).then((resp) => {
        throw resp;
      });
    };

    const headers = {
      'Content-Type': 'application/json',
    };

    const restaurants = await fetch(
      'https://vast-woodland-15279.herokuapp.com/restaurants',
      {
        method: 'GET',
        headers,
      }
    )
      .then(checkStatus)
      .then(parseJSON);

    return { restaurants };
  } catch (errro) {
    return { error };
  }
};

export default Home;
