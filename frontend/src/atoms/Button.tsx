type ButtonProps = {
  id: string;
  disabled: boolean;
  type: any;
  className: string;
  clickFunction: () => void;
  text: String;
};

const Button: React.FC<ButtonProps> = ({
  id,
  className,
  disabled,
  type,
  clickFunction,
  text,
}) => {
  return (
    <button
      id={id}
      className={className}
      type={type}
      disabled={disabled}
      onClick={clickFunction}
    >
      {text}
    </button>
  );
};

export default Button;
