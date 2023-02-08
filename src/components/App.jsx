import React from 'react';

import Section from './Section/Section';
import Form from './Form/Form';
import Contacts from './Contacts/Contacts';
import Filter from './Filter/Filter';

class App extends React.Component {
  state = {
    contacts: [
      /*   { id: 'id-1', name: 'Harry Potter', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Granger', number: '443-89-12' },
      { id: 'id-3', name: 'Lord Voldemort', number: '645-17-79' },
      { id: 'id-4', name: 'Albus Dumbledor', number: '227-91-26' },
      { id: 'id-5', name: 'Severus Snape', number: '227-91-26' }, */
    ],
    filter: '',
  };

  handleFormSubmit = data => {
    if (this.checkName(data)) {
      alert(`${data.name} is already in contacts.`);
      return;
    }

    this.setState({
      contacts: [data, ...this.state.contacts],
    });
  };

  handleFormChange = e => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  filtredContacts = () => {
    const normalizedFilter = this.state.filter.toLowerCase();

    return this.state.contacts.filter(element =>
      element.name.toLowerCase().includes(normalizedFilter)
    );
  };

  checkName = data => {
    return this.state.contacts.some(element => element.name === data.name);
  };

  handleContactDelete = id => {
    this.setState({
      contacts: this.state.contacts.filter(element => element.id !== id),
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      const contactsListStringified = JSON.stringify(this.state.contacts);
      window.localStorage.setItem('contacts-list', contactsListStringified);
    }
    console.log(`component did update`);
  }

  componentDidMount() {
    const list = window.localStorage.getItem('contacts-list');
    if (!list) return;
    console.log(`parsed`);
    try {
      this.setState({
        contacts: JSON.parse(list),
      });
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
      <div className="phonebookBox">
        <h1 className="title">Phonebook</h1>
        <Form submit={this.handleFormSubmit} />
        <Section title="Contacts">
          <Filter onFilter={this.state.filter} change={this.handleFormChange} />
          <Contacts
            contacts={this.filtredContacts()}
            onContactDelete={this.handleContactDelete}
          />
        </Section>
      </div>
    );
  }
}

export { App };
