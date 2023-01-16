import ContactDetails from './ContactDetails';
import contactService from '../services/contacts';

const ContactList = ({ persons, setPersons }) => {
  const findPersonIdx = (id) => {
    for (let idx = 0; idx < persons.length; idx += 1) {
      if (persons[idx].id === id) {
        return idx;
      }
    }

    return -1;
  };

  const asyncDeleteContact = async (id) => {
    let deleteIdx = findPersonIdx(id);

    if (window.confirm(`Delete ${persons[deleteIdx].name}?`)) {
    // try {
      await contactService.deleteContact(id);

      let newPersons = [...persons];
      newPersons.splice(deleteIdx, 1);

      setPersons(newPersons);
    // } catch {
    //   alert('Failed to delete');
    // }
    }
  }

  const clickDeleteHandler = (event) => {
    asyncDeleteContact(Number(event.target.dataset.id));
  };

  return persons.map((person) => {
    return (
      <ContactDetails
        key={person.id}
        id={person.id}
        name={person.name}
        number={person.number}
        clickDeleteHandler={clickDeleteHandler}>
      </ContactDetails>
    );
  });
}

export default ContactList;
