import ContactDetails from './ContactDetails';
import contactService from '../services/contacts';

const ContactList = ({ persons, setPersons }) => {
  const asyncDeleteContact = async (id) => {
    let deleteIdx = contactService.findPersonIdx(id, persons);

    if (window.confirm(`Delete ${persons[deleteIdx].name}?`)) {
      try {
        await contactService.deleteContact(id);

        let newPersons = [...persons];
        newPersons.splice(deleteIdx, 1);

        setPersons(newPersons);
      } catch {
        alert('Failed to delete');
      }
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
