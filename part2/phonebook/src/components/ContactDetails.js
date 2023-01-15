const ContactDetails = ({ id, name, number, clickDeleteHandler }) => {
  return (
    <div>
      {name} {number} <button data-id={id} onClick={clickDeleteHandler}>delete</button>
    </div>
  );
}
export default ContactDetails;
