type InputFieldProps = {
  id: string;
  name: string;
  className: string;
  disabled: boolean;
  type: string;
  value: any;
  placeholder: string;
  onChange: (e: any) => void;
};

const InputField: React.FC<InputFieldProps> = ({
  id,
  name,
  className,
  disabled,
  type,
  value,
  placeholder,
  onChange,
}) => {
  return (
    <>
      <input
        type={type}
        name={name}
        id={id}
        className={className}
        disabled={disabled}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </>
  );
};

export default InputField;
