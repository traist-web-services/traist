import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          <script
            async
            src="https://analytics.traist.co.uk/a.js"
            data-ackee-server="https://analytics.traist.co.uk"
            data-ackee-domain-id="34c8679f-8c0c-4cce-9c54-70fc20256fb8"
          ></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
