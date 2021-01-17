import Button from "../button/Button";

export default function ContactForm() {
  const inputRingStyles = "p-2 mb-2 outline-none ring ring-brand-800 rounded";

  return (
    <section className="flex flex-col items-center justify-center p-4 md:px-12 lg:p-24">
      <form
        className="flex-grow text-xl lg:text-2xl p-12 shadow-md rounded-lg w-full max-w-prose flex flex-col"
        id="contact-form"
      >
        <h1 className="font-bold text-4xl md:text-6xl mb-4 mt-0">
          Get in touch
        </h1>
        <label htmlFor="name" className="mb-2">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className={inputRingStyles}
          required
        />
        <label htmlFor="email" className="my-2">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className={inputRingStyles}
          required
        />
        <label htmlFor="message" className="my-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          className={inputRingStyles}
          required
        ></textarea>
        <Button href={null}>Send us a message!</Button>
      </form>
    </section>
  );
}
