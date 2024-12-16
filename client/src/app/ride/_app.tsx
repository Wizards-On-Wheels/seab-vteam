import Script from "next/script";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAcapT2gHrQWeCsLuFFQO594R5UtRV5EGU`}
        strategy="beforeInteractive" // Load before rendering
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
