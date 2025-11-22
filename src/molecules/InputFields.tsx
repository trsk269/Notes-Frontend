import { UseFormRegister } from "react-hook-form";

interface InputFieldsProps {
  label: string;
  name: string;
  type?: string;
  register: UseFormRegister<any>;
  error?: any;
}

const InputFields = ({
  label,
  name,
  type = "text",
  register,
  error,
}: InputFieldsProps) => {
  return (
    <div className="flex flex-col space-y-1">
      <label
        htmlFor={name}
        className="capitalize text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        id={name}
        type={type}
        {...register(name)}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-500 bg-red-50" : "border-gray-300"
        }`}
        placeholder={`Enter your ${label.toLowerCase()}`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
};

export default InputFields;
