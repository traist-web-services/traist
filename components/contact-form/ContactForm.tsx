import Button from "../button/Button";
import styles from "./ContactForm.module.scss";

const ContactForm = () => {
  return (
    <section className={styles.formSection}>
      <form className={styles.formContainer} id="contact-form">
        <h1 className={styles.formHeader}>Get in touch</h1>
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
        <Button type="submit" href={null}>
          Send us a message!
        </Button>
      </form>
    </section>
  );
};

export default ContactForm;
