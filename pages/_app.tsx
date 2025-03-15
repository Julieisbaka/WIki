import type { AppProps } from 'next/app';
import '../styles/NodeChart.css';
import '../styles/wiki-graph.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
