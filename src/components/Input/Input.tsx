interface InputProps {
  type: string;
  value?: string;
  handlerInput: React.ChangeEventHandler<HTMLInputElement>;
  keyPressHandler?: React.KeyboardEventHandler<HTMLInputElement>;
  className: string;
  placeholder: string;
}

const Input = ({
  type,
  value = '',
  handlerInput,
  keyPressHandler,
  className,
  placeholder,
}: InputProps) => {
  return (
      <input
        className={className}
        type={type}
        value={value}
        placeholder={placeholder}
        onKeyDown={keyPressHandler}
        onChange={handlerInput}
      />
  );
};

export default Input;
