export { PrimaryButton, SecondaryButton };

function PrimaryButton({ btnText, onClickHandler }) {
  return (
    <button className="btn btn__primary" onClick={onClickHandler}>
      {btnText}
    </button>
  );
}

function SecondaryButton({ btnText, onClickHandler }) {
  return (
    <button className="btn card--btn" onClick={onClickHandler}>
      {btnText}
    </button>
  );
}
