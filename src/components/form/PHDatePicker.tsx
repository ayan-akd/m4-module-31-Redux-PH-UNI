import { Controller } from "react-hook-form";
import { DatePicker, Form } from "antd";

type TDatePickerProps = {
  name: string;
  label?: string;
};
export default function PHDatePicker({ name, label }: TDatePickerProps) {
  return (
    <div>
      <Controller
        name={name}
        render={({ field, fieldState: { error }  }) => (
          <Form.Item label={label}>
            <DatePicker variant="filled" {...field} size="large" style={{ width: "100%" }} />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
}
