import Head from "next/head";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col leading-relaxed relative">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="font-sans flex flex-col flex-grow justify-center overflow-x-hidden text-brand-800">
        {children}
      </main>
    </div>
  );
}
