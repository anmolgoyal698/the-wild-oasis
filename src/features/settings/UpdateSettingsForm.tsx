import styled from "styled-components";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings } from "./hooks/useSettings";
import Spinner from "../../ui/Spinner";
import { useUpdateSetting } from "./hooks/useUpdateSetting";

const Label = styled.label`
  font-weight: 500;
`;

const UpdateSettingsForm = () => {
  const { isPending, settings } = useSettings();

  const {isUpdating, updateSettings} = useUpdateSetting();

  if (isPending) {
    return <Spinner />;
  }

  function handleUpdate(event: React.FocusEvent<HTMLInputElement>, settingKey: string) {
    if(!event.target.value) return;
    const newValue = Number(event.target.value);
    updateSettings({ [settingKey]: newValue });
  }

  const {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = settings;

  return (
    <Form>
      <FormRow>
        <Label htmlFor="min-nights">Minimum nights/booking</Label>
        <Input type="number" id="min-nights" onBlur={e => handleUpdate(e, "minBookingLength")} disabled={isUpdating} defaultValue={minBookingLength} />
      </FormRow>
      <FormRow>
        <Label htmlFor="max-nights">Maximum nights/booking</Label>
        <Input type="number" id="max-nights" onBlur={e => handleUpdate(e, "maxBookingLength")} disabled={isUpdating} defaultValue={maxBookingLength} />
      </FormRow>
      <FormRow>
        <Label htmlFor="max-guests">Maximum guests/booking</Label>
        <Input type="number" id="max-guests" onBlur={e => handleUpdate(e, "maxGuestsPerBooking")} disabled={isUpdating} defaultValue={maxGuestsPerBooking} />
      </FormRow>
      <FormRow>
        <Label htmlFor="breakfast-price">Breakfast price</Label>
        <Input type="number" id="breakfast-price" onBlur={e => handleUpdate(e, "breakfastPrice")} disabled={isUpdating} defaultValue={breakfastPrice} />
      </FormRow>
    </Form>
  );
};

export default UpdateSettingsForm;
