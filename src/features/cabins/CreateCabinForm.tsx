import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useEditCabin } from "./useEditCabin";
import { useCreateCabin } from "./useCreateCabin";
import FormRow from "../../ui/FormRow";


const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm({ cabinToEdit = {}}) {

  const {id: editCabinId, ...editValues} = cabinToEdit;
  const isEditMode = Boolean(editCabinId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditMode ? {...editValues} : {}
  });

  const { errors } = formState;

  const { addCabin, isCreating } = useCreateCabin();
  const { editCabin, isEditing } = useEditCabin(editCabinId);

  function onSubmit(data: any) {
    if (isEditMode) {
      const image = typeof data.image === "object" ? data.image[0] : data.image;
      editCabin({...data, image});
    } else {
      addCabin({...data, image: data.image[0]}, {onSuccess: (data) => { console.log(data); reset(); }});
    }
  }

  function onError(errors: any) {
    console.log("Form errors:", errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input type="text" id="name" disabled={isCreating || isEditing} {...register("name", {
          required: "This field is required"
        })} />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input type="number" id="maxCapacity" disabled={isCreating || isEditing} {...register("maxCapacity", {
          required: "This field is required",
          min: {
            value: 1,
            message: "Capacity should be atleast 1"
          }
        })} />
        {errors?.maxCapacity?.message && <Error>{errors.maxCapacity.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input type="number" id="regularPrice" disabled={isCreating || isEditing} {...register("regularPrice", {
          required: "This field is required",
          min: {
            value: 0,
            message: "Regular price should be at least 0"
          }
        })} />
        {errors?.regularPrice?.message && <Error>{errors.regularPrice.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input type="number" id="discount" disabled={isCreating || isEditing} defaultValue={0} {...register("discount", {
          required: "This field is required",
          validate: (value) => +value <= +getValues().regularPrice || "Discount should be less than or equal to regular price"
        })} />
        {errors?.discount?.message && <Error>{errors.discount.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea id="description" defaultValue="" disabled={isCreating || isEditing} {...register("description", {
          required: "This field is required"
        })} />
        {errors?.description?.message && <Error>{errors.description.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput id="image" type="file" accept="image/*" disabled={isCreating || isEditing} {...register("image", {
          required: isEditMode ? false : "This field is required"
        })} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variant="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>{isEditMode ? "Edit cabin" : "Create new cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
