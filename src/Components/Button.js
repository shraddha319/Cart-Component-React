export { PrimaryButton };

function PrimaryButton({ btnText, onClickHandler }) {
  return (
    <button className="btn btn__primary" onClick={onClickHandler}>
      {btnText}
    </button>
  );
}
