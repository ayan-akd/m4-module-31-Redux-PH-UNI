import { Controller } from "react-hook-form";
import { Form, Input } from "antd";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  disabled?: boolean;
};
export default function PHInput({ type, name, label, disabled }: TInputProps) {
  return (
    <div>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <Input
              variant="filled"
              {...field}
              id={name}
              type={type}
              size="large"
              disabled={disabled}
            />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
}
