import Button from 'components/ui/Button';
import Input from 'components/ui/Input';
import { FormEventHandler, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { formSchema, FormType } from 'schemas';
import { useStateSelector, useTypedDispatch } from 'store';
import { selectAllowedCountries } from 'store/allowedCountries.slice';
import { addEntry } from 'store/formsData.slice';

const Form = () => {
  const navigate = useNavigate();
  const allowedCountries = useStateSelector(selectAllowedCountries);
  const dispatch = useTypedDispatch();

  const [errors, setErrors] =
    useState<{ [key in keyof FormType]: string | undefined }>();

  const imageRef = useRef<HTMLImageElement | null>(null);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (ev) => {
    ev.preventDefault();
    const values = Object.fromEntries(new FormData(ev.currentTarget).entries());
    console.log({ values });
    const result = await formSchema.safeParseAsync({
      ...values,
      accept: values.accept === 'on',
    });
    console.log({ result });
    if (result.success) {
      setErrors(undefined);
      console.log('Submited!!!');
      console.log(result.data);
      const { accept, confirmPassword, ...dataToStore } = result.data; //eslint-disable-line @typescript-eslint/no-unused-vars
      dispatch(addEntry({ ...dataToStore, timeStamp: Date.now() }));
      navigate('/view');
    } else {
      console.log('Errors');
      console.log(result.error.errors);
      setErrors(() => {
        return result.error.errors.reduce(
          (acc, error) => {
            if (error.path) {
              error.path.forEach((path) => {
                if (!acc[path as keyof FormType]) {
                  acc[path as keyof FormType] = error.message;
                }
              });
            }
            return acc;
          },
          {} as { [key in keyof FormType]: string | undefined }
        );
      });
      console.log('State errors: ');
      console.log({ errors });
    }
  };

  return (
    <>
      <h1>Native form</h1>
      <form onSubmit={onSubmit} className="flex flex-col">
        <Input
          label="Name"
          type="text"
          name="name"
          placeholder="Name"
          required
          error={errors?.name}
        />

        <Input
          label="Age"
          type="number"
          name="age"
          placeholder="Age"
          required
          error={errors?.age}
        />

        <Input
          label="Email"
          type="email"
          name="email"
          required
          error={errors?.email}
        />

        <Input
          label="Password"
          type="password"
          name="password"
          required
          error={errors?.password}
        />
        <Input
          label="confirmPassword"
          type="password"
          name="confirmPassword"
          required
          error={errors?.confirmPassword}
        />

        <fieldset>
          <legend>Gender</legend>
          <label>
            Male
            <input type="radio" name="gender" value={'male'} required />
          </label>
          <label>
            Female
            <input type="radio" name="gender" value={'female'} />
          </label>
          <div>{errors?.gender}</div>
        </fieldset>

        <Input
          label="Accept terms and conditions"
          type="checkbox"
          name="accept"
          // required
          error={errors?.accept}
        />

        {/* picture */}
        <Input
          label="Picture"
          type="file"
          name="picture"
          required
          error={errors?.picture}
          onChange={(ev) => {
            const file = ev.target.files?.[0];
            if (!file) {
              return;
            }
            // if (image) {
            //   URL.revokeObjectURL(image);
            // }
            // setImage(URL.createObjectURL(file));
          }}
        />

        <label>
          <select name="country">
            <option value="Not allowed Country"></option>
            {allowedCountries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          <div>{errors?.country}</div>
        </label>

        <Button type="submit">Submit</Button>
      </form>
      {/* {JSON.stringify(errors)} */}
      <img ref={imageRef} />
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
