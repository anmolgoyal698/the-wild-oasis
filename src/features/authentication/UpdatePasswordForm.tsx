import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUpdateUser } from "./useUpdateUser";
import styled from "styled-components";

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { updateUser, isUpdating } = useUpdateUser();

  function onSubmit({ password }: any) {
    updateUser({ password }, { onSuccess: () => reset() });
  }

  const Label = styled.label`
  font-weight: 500;
`;

  const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;


  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
      >
        <Label htmlFor="password">Password (min 8 characters)</Label>
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
        {typeof errors?.password?.message === "string" && <Error>{errors.password.message}</Error>}
      </FormRow>

      <FormRow
      >
        <Label htmlFor="passwordConfirm">Confirm password</Label>
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isUpdating}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              getValues().password === value || "Passwords need to match",
          })}
        />
        {typeof errors?.passwordConfirm?.message === "string" && <Error>{errors.passwordConfirm.message}</Error>}
      </FormRow>
      <FormRow>
        <Button onClick={reset} type="reset" variant="secondary">
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update password</Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
