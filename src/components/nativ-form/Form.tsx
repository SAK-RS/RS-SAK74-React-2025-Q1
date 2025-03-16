import Button from 'components/ui/Button';
import Input from 'components/ui/Input';
import { allowedPictureTypes } from 'form_setup';
import { type FormEventHandler, useState } from 'react';
import { useNavigate } from 'react-router';
import { formSchema, type FormType } from 'schemas';
import { useStateSelector, useTypedDispatch } from 'store';
import { selectAllowedCountries } from 'store/allowedCountries.slice';
import { addEntry } from 'store/formsData.slice';

const Form = () => {
  const navigate = useNavigate();
  const allowedCountries = useStateSelector(selectAllowedCountries);
  const dispatch = useTypedDispatch();

  const [errors, setErrors] =
    useState<{ [key in keyof FormType]: string | undefined }>();
  const [image, setImage] = useState<string | undefined>();

  const onSubmit: FormEventHandler<HTMLFormElement> = async (ev) => {
    ev.preventDefault();
    const values = Object.fromEntries(new FormData(ev.currentTarget).entries());
    const result = await formSchema.safeParseAsync({
      ...values,
      accept: values.accept === 'on',
    });
    if (result.success) {
      setErrors(undefined);
      const { accept, confirmPassword, ...dataToStore } = result.data; //eslint-disable-line @typescript-eslint/no-unused-vars
      dispatch(addEntry({ ...dataToStore, timeStamp: Date.now() }));
      navigate('/view');
    } else {
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
    }
  };

  return (
    <>
      <h1>Native form</h1>
      <button
        className="cursor-pointer float-right mr-4"
        onClick={() => {
          navigate(-1);
        }}
      >
        Go back
      </button>
      <form onSubmit={onSubmit} className="form">
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
          placeholder="E-mail"
          required
          error={errors?.email}
        />

        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Password"
          required
          error={errors?.password}
        />
        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          required
          error={errors?.confirmPassword}
        />

        <fieldset className="flex flex-col">
          <legend>Gender</legend>
          <div className="flex gap-8 px-4">
            <label>
              Male
              <input type="radio" name="gender" value={'male'} required />
            </label>
            <label>
              Female
              <input type="radio" name="gender" value={'female'} />
            </label>
          </div>

          <div className="error">{errors?.gender}</div>
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
            if (image) {
              URL.revokeObjectURL(image);
            }
            if (!allowedPictureTypes.types.includes(file.type)) {
              setImage(undefined);
            } else {
              setImage(URL.createObjectURL(file));
            }
          }}
        />
        {image && (
          <div className="rounded-lg w-36 relative">
            <img src={image} width={144} />
            <button
              title="Remove"
              onClick={() => {
                setImage(undefined);
              }}
              className="absolute -right-2 -top-2 rounded-full border-2 border-error cursor-pointer bg-gray-400"
            >
              ❌
            </button>
          </div>
        )}

        <label className="flex w-full flex-col p-1">
          <div className="flex justify-between items-center">
            <span>Country</span>
            <select name="country" className="dark:bg-bgdark">
              <option value="Not allowed Country"></option>
              {allowedCountries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          <div className="error">{errors?.country}</div>
        </label>

        <div className="w-full inline-flex justify-between">
          <Button
            variant="warn"
            type="reset"
            onClick={() => {
              setImage(undefined);
            }}
          >
            Reset
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </>
  );
};

export default Form;
