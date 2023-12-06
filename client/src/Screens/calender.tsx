import React from "react";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { View, Button, Text, TextInput } from "react-native";
import { Input } from "react-native-elements";

const schema = yup.object().shape({
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must contain at least 8 characters"),
});

const FormComponent = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onPressSend = (formData) => {
    // Perform actions with the validated form data
  };

  return (
    <View>
      <View>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              // leftIcon={<Icon name="lock" size={20} color="#00B661" />}
              label={"password"}
              placeholder="Ainfd$875"
              value={value}
              style={{ fontSize: 15 }}
              labelStyle={{ fontSize: 15 }}
              onChangeText={onChange}
              s
            />
          )}
          name="email"
        />
        {errors.email && <Text>{errors.email.message}</Text>}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              placeholder="Password"
              secureTextEntry
            />
          )}
          name="password"
        />
        {errors.password && <Text>{errors.password.message}</Text>}
      </View>
      <Button title="Submit" onPress={handleSubmit(onPressSend)} />
    </View>
  );
};

export default FormComponent;
