type InputFieldProps = {
  type: string;
  value: string;
  placeholder: string;
  onChange: () => void;
};

const InputField: React.FC<InputFieldProps> = ({
  type,
  value,
  placeholder,
  onChange,
}) => {
  switch (type) {
    case "text":
      return (
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      );
    case "checkbox":
      return (
        <input
          type="checkbox"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      );
    case "date":
      return (
        <input
          type="date"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      );
    case "email":
      return (
        <input
          type="email"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      );
    case "radio":
      return (
        <input
          type="radio"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      );
    case "password":
      return (
        <input
          type="password"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      );
  }
};

export default InputField;
