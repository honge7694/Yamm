import Layout from './Layout'
import "tailwindcss/tailwind.css";
import '../styles/globals.css';
import wrapper from '../store/configureStore';

function MyApp({ Component, pageProps }) {
  return ( 
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default wrapper.withRedux(MyApp);
