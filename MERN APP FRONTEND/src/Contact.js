import React from "react";
import { FaLinkedin } from "react-icons/fa";
import styles from "./Contact.module.css";

const Contact = () => {
  return (
    <div className={styles.container}>
       <h1 className={styles.title}>Site made by Avdhut Tarwal</h1>
      <h1 className={styles.title}>Contact Me</h1>
      <p className={styles.description}>
        Feel free to reach out to me via LinkedIn!
      </p>
      <a
        href="https://www.linkedin.com/in/avdhut-tarwal-2788412b7/"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
      >
        <FaLinkedin className={styles.icon} />
        Connect on LinkedIn
      </a>
    </div>
  );
};

export default Contact;
