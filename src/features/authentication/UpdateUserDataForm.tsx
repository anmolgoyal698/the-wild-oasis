import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useAuth } from "./useAuth";
import { styled } from "styled-components";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point

  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName }
    },
  }: any = useAuth();

  const [fullName, setFullName] = useState(currentFullName);
  const [_, setAvatar] = useState<File | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  const Label = styled.label`
  font-weight: 500;
  `;

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow>
        <Label htmlFor="email">Email</Label>
        <Input id="email"value={email} disabled />
      </FormRow>
      <FormRow>
        <Label htmlFor="fullName">Full name</Label>
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
        />
      </FormRow>
      <FormRow>
        <Label htmlFor="avatar">Avatar image</Label>
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files ? e.target.files[0] : null)}
        />
      </FormRow>
      <FormRow>
        <Button type="reset" variant="secondary">
          Cancel
        </Button>
        <Button>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;