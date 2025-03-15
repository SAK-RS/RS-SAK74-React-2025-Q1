import { zodResolver } from '@hookform/resolvers/zod';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';
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
    formState: { errors, isValid, isValidating },
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
        noValidate
      >
        <Input
          label="Name"
          {...register('name')}
          error={errors.name?.message}
        />

        <Input
          label="Age"
          type="number"
          {...register('age')}
          error={errors.age?.message}
        />

        <Input
          label="Email"
          {...register('email')}
          type="email"
          error={errors.email?.message}
        />

        <Input
          label="Password"
          {...register('password')}
          type="password"
          error={errors.password?.message}
        />
        <Input
          label="confirmPassword"
          {...register('confirmPassword')}
          type="password"
          error={errors.confirmPassword?.message}
        />

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

        <Input
          label="Accept terms and conditions"
          type="checkbox"
          {...register('accept')}
          error={errors.accept?.message}
        />

        {/* picture */}
        <Input
          label="Picture"
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
          error={errors.picture?.message}
        />

        {/* country */}
        <Input
          label="Select country"
          {...register('country')}
          error={errors.country?.message}
          placeholder="Type to search..."
          onChange={(ev) => {
            const value = ev.target.value;
            setFilteredCountries(
              ALLOWED_COUNTRIES.filter((country) =>
                country.toLowerCase().includes(value.toLowerCase())
              )
            );
          }}
          menuOptions={
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
          }
        />

        <Button type="submit" disabled={!isValid || isValidating}>
          Submit
        </Button>
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
