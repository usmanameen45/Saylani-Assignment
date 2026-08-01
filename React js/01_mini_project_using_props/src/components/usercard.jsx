import "./usercard.css";

function Usercard({ name, email, age, gender, phone, image }) {
  console.log(image);
  return (
    <div className="usercard">
      <img src={image} alt="user" />
      <h2>{name}</h2>
      <p>{email}</p>
      <p>{age}</p>
      <p>{gender}</p>
      <p>{phone}</p>
    </div>
  );
}

export default Usercard;
