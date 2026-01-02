import { styled } from "styled-components";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useForm } from "react-hook-form";
import { useSignUp } from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function SignupForm() {
  const {register, formState: { errors }, handleSubmit, getValues, reset } = useForm();
  const {isPending, signUp} = useSignUp();

  function onSubmit({ fullName, email, password }: any) {
    console.log("Form data:", { fullName, email, password });
    signUp({ fullName, email, password }, {
      onSettled: () => {
        reset();
      }
    });
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="fullName">Full name</Label>
        <Input type="text" id="fullName" disabled={isPending} {...register("fullName", { required: 'This field is required' })} />
        {typeof errors?.fullName?.message === "string" && <Error>{errors.fullName.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="email">Email address</Label>
        <Input type="email" id="email" disabled={isPending} {...register("email", { required: 'This field is required', pattern: { value: /\S+@\S+\.\S+/, message: 'Please provide a valid email address' } })} />
        {typeof errors?.email?.message === "string" && <Error>{errors.email.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="password">Password (min 8 characters)</Label>
        <Input type="password" id="password" disabled={isPending} {...register("password", { required: 'This field is required', minLength: { value: 8, message: 'Password must be at least 8 characters long' } })} />
        {typeof errors?.password?.message === "string" && <Error>{errors.password.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="passwordConfirm">Repeat password</Label>
        <Input type="password" id="passwordConfirm" disabled={isPending} {...register("passwordConfirm", { required: 'This field is required', validate: value => value === getValues().password || 'Passwords do not match' })} />
        {typeof errors?.passwordConfirm?.message === "string" && <Error>{errors.passwordConfirm.message}</Error>}
      </FormRow>

      <FormRow>
        <Button variant="secondary" type="reset">
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          Create new user
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
