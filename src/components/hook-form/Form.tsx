import { zodResolver } from '@hookform/resolvers/zod';
import { ALLOWED_COUNTRIES } from 'form_setup';
import { useState } from 'react';
import {
  type SubmitHandler,
  type SubmitErrorHandler,
  useForm,
} from 'react-hook-form';
import { useNavigate } from 'react-router';
import { formSchema, FormType } from 'schemas';
import 'styles/form.css';

const Form = () => {
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: zodResolver(formSchema, { async: true }),
    mode: 'all',
    defaultValues: { gender: 'female' },
  });

  const onValid: SubmitHandler<FormType> = (data) => {
    console.log('Submited!!!');
    console.log(data);
  };

  const onErrors: SubmitErrorHandler<FormType> = (errors) => {
    console.log('Errors');
    console.log(errors);
  };

  const [image, setImage] = useState<string | undefined>();

  const { onChange: formPictureOnChange, ...restPictureProps } =
    register('picture');

  const [filteredCountries, setFilteredCountries] = useState<
    FormType['country'][]
  >([]);

  return (
    <>
      <h1>Hook form</h1>
      <form
        onSubmit={handleSubmit(onValid, onErrors)}
        className="flex flex-col gap-2"
      >
        <label>
          Name
          <input {...register('name')} />
          <div className="">{errors.name?.message}</div>
        </label>
        <label className="">
          Age
          <input type="number" {...register('age')} />
          <div className="">{errors.age?.message}</div>
        </label>
        <label>
          Email
          <input {...register('email')} />
          <div className="">{errors.email?.message}</div>
        </label>

        <label>
          Password
          <input type="password" {...register('password')} />
          <div className="">{errors.password?.message}</div>
        </label>
        <label>
          Confirm Password
          <input type="password" {...register('confirmPassword')} />
          <div className="">{errors.confirmPassword?.message}</div>
        </label>

        <fieldset>
          <legend>Gender</legend>
          <label>
            Male
            <input type="radio" {...register('gender')} value={'male'} />
          </label>
          <label>
            Female
            <input type="radio" {...register('gender')} value={'female'} />
          </label>
          <div className="">{errors.gender?.message}</div>
        </fieldset>

        <label>
          Accept terms and conditions
          <input type="checkbox" {...register('accept')} />
          <div className="">{errors.accept?.message}</div>
        </label>

        {/* picture */}
        <label>
          Picture
          <input
            type="file"
            {...restPictureProps}
            onChange={(ev) => {
              formPictureOnChange(ev);
              const file = ev.target.files?.[0];
              if (!file) {
                return;
              }
              if (image) {
                URL.revokeObjectURL(image);
              }
              setImage(URL.createObjectURL(file));
            }}
          />
          <div className="">{errors.picture?.message}</div>
        </label>

        {/* country */}
        <label>
          Select country
          <span className="relative ">
            <input
              type="text"
              {...register('country')}
              placeholder="Type to search..."
              onChange={(ev) => {
                const value = ev.target.value;
                setFilteredCountries(
                  ALLOWED_COUNTRIES.filter((country) =>
                    country.toLowerCase().includes(value.toLowerCase())
                  )
                );
              }}
            />
            <div>{errors.country?.message}</div>
            <ul>
              {filteredCountries.map((country) => (
                <li
                  key={country}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    setValue('country', country, { shouldValidate: true });
                    setFilteredCountries([]);
                  }}
                >
                  {country}
                </li>
              ))}
            </ul>
          </span>
        </label>

        <button type="submit">Submit</button>
      </form>
      <img src={image} alt="" width={100} />
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        Go back
      </button>
    </>
  );
};

export default Form;
