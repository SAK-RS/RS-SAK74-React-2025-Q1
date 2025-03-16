import { zodResolver } from '@hookform/resolvers/zod';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';
import { allowedPictureTypes } from 'form_setup';
import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { formSchema, FormType } from 'schemas';
import { useStateSelector, useTypedDispatch } from 'store';
import { selectAllowedCountries } from 'store/allowedCountries.slice';
import { addEntry } from 'store/formsData.slice';

const Form = () => {
  const navigate = useNavigate();
  const allowedCountries = useStateSelector(selectAllowedCountries);
  const dispatch = useTypedDispatch();

  const {
    register,
    formState: { errors, isValid, isValidating },
    handleSubmit,
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(formSchema, { async: true }),
    mode: 'all',
    defaultValues: { gender: 'female' },
  });

  const onValid: SubmitHandler<FormType> = (data) => {
    const { accept, confirmPassword, ...dataToStore } = data; //eslint-disable-line @typescript-eslint/no-unused-vars
    dispatch(addEntry({ ...dataToStore, timeStamp: Date.now() }));
    navigate('/view');
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
      <button
        className="cursor-pointer float-right mr-4"
        onClick={() => {
          navigate(-1);
        }}
      >
        Go back
      </button>
      <form
        onSubmit={handleSubmit(onValid)}
        className="form"
        noValidate
        autoComplete="off"
      >
        <Input
          label="Name"
          placeholder="Name"
          {...register('name')}
          error={errors.name?.message}
        />

        <Input
          label="Age"
          type="number"
          placeholder="Age"
          {...register('age')}
          error={errors.age?.message}
        />

        <Input
          label="Email"
          {...register('email')}
          type="email"
          placeholder="E-mail"
          error={errors.email?.message}
        />

        <Input
          label="Password"
          {...register('password')}
          type="password"
          placeholder="Password"
          error={errors.password?.message}
        />
        <Input
          label="confirmPassword"
          {...register('confirmPassword')}
          type="password"
          placeholder="Confirm your password"
          error={errors.confirmPassword?.message}
        />

        <fieldset className="flex gap-8 px-4">
          <legend>Gender</legend>
          <Input
            label="Male"
            type="radio"
            {...register('gender')}
            value={'male'}
          />
          <Input
            label="Female"
            type="radio"
            {...register('gender')}
            value={'female'}
          />
          <div className="">{errors.gender?.message}</div>
        </fieldset>

        <Input
          label="Accept terms and conditions"
          type="checkbox"
          {...register('accept')}
          error={errors.accept?.message}
        />

        {/* picture */}
        <div>
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
              if (!allowedPictureTypes.types.includes(file.type)) {
                setImage(undefined);
              } else {
                setImage(URL.createObjectURL(file));
              }
            }}
            error={errors.picture?.message}
          />
          {image && (
            <div className="rounded-lg w-36 relative">
              <img src={image} width={144} />
              <button
                title="Remove"
                onClick={() => {
                  setValue('picture', {} as FormType['picture'], {
                    shouldValidate: true,
                  });
                  setImage(undefined);
                }}
                className="absolute -right-2 -top-2 rounded-full border-2 border-error cursor-pointer bg-gray-400"
              >
                ❌
              </button>
            </div>
          )}
        </div>

        {/* country */}
        <Input
          label="Select country"
          {...register('country')}
          error={errors.country?.message}
          placeholder="Type to search..."
          onChange={(ev) => {
            const value = ev.target.value;
            setFilteredCountries(
              allowedCountries.filter((country) =>
                country.toLowerCase().includes(value.toLowerCase())
              )
            );
          }}
          menuOptions={
            <ul>
              {filteredCountries.map((country) => (
                <li
                  key={country}
                  className="p-2 hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer"
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
        <div className="w-full inline-flex justify-between">
          <Button
            variant="warn"
            type="button"
            onClick={() => {
              reset();
              setImage(undefined);
            }}
          >
            Reset
          </Button>
          <Button type="submit" disabled={!isValid || isValidating}>
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};

export default Form;
