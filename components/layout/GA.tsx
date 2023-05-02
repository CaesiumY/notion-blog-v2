import Script from "next/script";

const GA = () => {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-TTWB2829C3"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-TTWB2829C3');
        `}
      </Script>
    </>
  );
};

export default GA;
