import { useState } from 'react';

const Input = ({
  label,
  name,
  type,
  placeholder,
  register,
  required,
  errors,
  validations
}) => {
  const passwordPattern =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
  const emailPattern =
    /^(([^<>()[\]\.,;:\s@"]+(\.[^<>()[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const [inputType, setInputType] = useState(type);

  const togglePassword = () => {
    setInputType((prev) => (prev === 'password' ? 'text' : 'password'));
  };

  return (
    <div>
      <div className="space-y-2">
        <label className="font-medium text-sm" htmlFor={name}>
          {label}
        </label>
        <div className="relative">
          <input
            className={`block w-full rounded-lg border ${
              errors[name]?.message ? 'border-[#BB2313]' : 'border-[#E7E7E7]'
            } ~text-sm/base px-4 ~py-2/2.5 outline-none font-dm-sans`}
            id={name}
            type={inputType}
            {...register(name, {
              required: {
                value: required,
                message: `The ${name
                  .replace(/([A-Z])/g, ' $1')
                  .toLowerCase()} field is required`
              },
              ...validations,
              pattern: {
                value:
                  type === 'email'
                    ? emailPattern
                    : type === 'password'
                    ? passwordPattern
                    : false,
                ...validations?.pattern
              }
            })}
            placeholder={placeholder}
          />

          {type === 'password' && (
            <span
              onClick={() => togglePassword()}
              className={`${
                errors[name]?.message ? 'text-[#BB2313]' : 'text-[#8E8E8E]'
              } absolute right-4 top-0 h-full content-center cursor-pointer`}
            >
              {inputType === 'password' ? (
                <svg
                  class="feather feather-eye-off"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" x2="23" y1="1" y2="23" />
                </svg>
              ) : (
                <svg
                  class="feather feather-eye"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </span>
          )}
        </div>
      </div>
      {errors[name]?.message && (
        <p className="text-[#BB2313] mt-1 text-sm">{errors?.[name]?.message}</p>
      )}
    </div>
  );
};
export default Input;
