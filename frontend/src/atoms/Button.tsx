type ButtonProps = {
  clickFunction: () => void;
  text: String;
};

const Button: React.FC<ButtonProps> = ({ clickFunction, text }) => {
  return <button onClick={clickFunction}>{text}</button>;
};

export default Button;
