import '../styles/globals.css';
import { Provider } from 'react-redux';
import {store} from '../store/index';


function MyApp({ Component, pageProps }) {

  console.log(store)


  return <Provider store={store}><Component {...pageProps} /></Provider>
}

export default MyApp
