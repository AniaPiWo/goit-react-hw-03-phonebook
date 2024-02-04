import React, { useState } from 'react';
import styles from './Form.module.css';

const Form = ({ onAddContact }) => {
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const newName = e.target.name.value;
    const newPhone = e.target.phone.value;

    const phoneRegex =
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;

    if (!newName || !newPhone) {
      setError('Please fill in all fields!');
      return;
    }

    if (!phoneRegex.test(newPhone)) {
      setError('Invalid phone number!');
      return;
    }

    const newContact = {
      id: `id-${Date.now()}`,
      name: newName,
      number: newPhone,
    };

    onAddContact(newContact);
    setError('');
    e.target.reset();
  };

  return (
    <form className={styles.form} action="" onSubmit={handleSubmit}>
      <div className={styles.inputs}>
        <input
          className={styles.input}
          type="text"
          placeholder="Name"
          name="name"
        />
        <p></p>
        <input
          className={styles.input}
          placeholder="Phone number"
          name="phone"
        />
      </div>
      <p className={styles.error}>{error}</p>
      <button className={styles.button} type="submit">
        Add contact
      </button>
    </form>
  );
};

export default Form;
