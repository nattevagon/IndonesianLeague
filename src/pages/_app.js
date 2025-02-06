import Footer from "@/components/molecules/Footer";
import Navigation from "@/components/molecules/Navigation";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Navigation />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}
