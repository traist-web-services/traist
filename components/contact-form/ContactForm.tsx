import Button from "../button/Button";
import styles from "./ContactForm.module.scss";
import Toast from "../toast/Toast";

import { useState } from "react";

interface Props {
  displayChrome: boolean;
}

const ContactForm = ({ displayChrome }: Props) => {
  const [formStatus, setFormStatus] = useState(null);
  const [toastProps, setToastProps] = useState({
    message: "",
    type: null,
  });
  const handleSubmit = (e: { preventDefault: () => void; target: any }) => {
    e.preventDefault();
    setFormStatus("SUBMITTED");
    const form = e.target;
    const data = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        form.reset();
        setFormStatus("SUCCESS");
        setToastProps({
          type: "success",
          message: "Thanks! Your message was sent successfully.",
        });
        setTimeout(
          () =>
            setToastProps({
              type: null,
              message: "",
            }),
          5500
        );
      } else {
        setFormStatus("ERROR");
        setToastProps({
          type: "error",
          message: "There was a problem submitting the form.",
        });
        setTimeout(
          () =>
            setToastProps({
              type: null,
              message: "",
            }),
          5500
        );
      }
    };
    xhr.send(data);
  };
  return (
    <section
      className={`${styles.formSection} ${
        displayChrome ? "" : styles.removeChrome
      }`}
    >
      <form
        className={`${styles.formContainer} ${
          displayChrome ? "" : styles.removeChrome
        }`}
        id="contact-form"
        action="https://formspree.io/f/moqprqlg"
        method="POST"
        onSubmit={handleSubmit}
      >
        <h1
          className={`${styles.formHeader} ${
            displayChrome ? "" : styles.hiddenContent
          }`}
        >
          Get in touch
        </h1>
        <label htmlFor="name" className={styles.formLabel}>
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className={styles.ringStyle}
          required
        />
        <label htmlFor="email" className={styles.formLabel}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className={styles.ringStyle}
          required
        />
        <label htmlFor="message" className={styles.formLabel}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          className={styles.ringStyle}
          required
        ></textarea>
        <Button type="submit" href={null} disabled={formStatus === "SUBMITTED"}>
          Send us a message!
        </Button>
      </form>
      <Toast type={toastProps.type} message={toastProps.message} />
    </section>
  );
};

export default ContactForm;
