import Head from 'next/head'

import Layout from '../components/layout/Layout';
import Header from '../components/layout/Header';
import Hero from '../components/hero/Hero';
import Slider from '../components/slider/Slider';
import Contact from '../components/contact-form/ContactForm';
import Footer from '../components/layout/Footer';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Traist - Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen flex flex-col">
        <Header />
        <Hero />
      </div>
      <Slider />
      <Contact />
      <Footer />
    </Layout>
  )
}
