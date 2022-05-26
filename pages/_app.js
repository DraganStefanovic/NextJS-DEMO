import '../styles/globals.css';
import { Provider } from 'react-redux';
import {store} from '../store/index';
import Head  from 'next/head';


export default function Document({ Component, pageProps }) {
  return (
            <Provider store={store}>
              <Head >
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous" />
                <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.3/TweenMax.min.js"></script>
                <script src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/MorphSVGPlugin.min.js"></script>            
                

              </Head >
              <Component {...pageProps} />
            </Provider>
          )
}

