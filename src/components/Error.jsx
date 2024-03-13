export default function Error({ title, message }) {
  console.log(title, message);
  return (
    <div className="error">
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}
