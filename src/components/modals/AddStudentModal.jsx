import React from "react";
import { useForm } from "@mantine/form";
import {
  TextInput,
  Select,
  NumberInput,
  Textarea,
  Button,
  Box,
  Flex,
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { addStudent } from "../../redux/studentsReducer";

const AddStudentModal = ({ close }) => {
  const data = useSelector((state) => state.students.students);
  const dispatch = useDispatch();
  const form = useForm({
    initialValues: {
      fullName: "",
      fatherName: "",
      email: "",
      academicStatus: "",
      age: "",
      city: "",
      address: "",
      gender: "",
      phoneNumber: "",
    },

    validate: {
      fullName: (value) => (value ? null : "Full name is required"),
      fatherName: (value) => (value ? null : "Father's name is required"),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      academicStatus: (value) => (value ? null : "Academic status is required"),
      age: (value) => (value > 0 ? null : "Age must be a positive number"),
      city: (value) => (value ? null : "City is required"),
      gender: (value) => (value ? null : "Gender is required"),
      phoneNumber: (value) =>
        /^\d+$/.test(value) ? null : "Invalid phone number",
    },
  });

  const handleSubmit = (values) => {
    console.log(values);
    dispatch(addStudent({ ...values, id: Date.now() }));
    console.log(data);
    close();
  };

  return (
    <Box sx={{ maxWidth: 500 }} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Flex justify={"space-around"}>
          <TextInput
            w={175}
            label="Full Name"
            placeholder="Full Name"
            {...form.getInputProps("fullName")}
          />
          <TextInput
            w={175}
            label="Father's Name"
            placeholder="Father's Name"
            {...form.getInputProps("fatherName")}
          />
        </Flex>
        <Flex justify={"space-around"}>
          <TextInput
            w={175}
            label="Email"
            placeholder="Email"
            {...form.getInputProps("email")}
          />
          <Select
            w={175}
            label="Academic Status"
            placeholder="Select academic status"
            data={["Undergraduate", "Graduate", "Postgraduate"]}
            {...form.getInputProps("academicStatus")}
          />
        </Flex>
        <Flex justify={"space-around"}>
          <NumberInput
            w={175}
            label="Age"
            placeholder="Age"
            {...form.getInputProps("age")}
          />
          <TextInput
            w={175}
            label="City"
            placeholder="City"
            {...form.getInputProps("city")}
          />
        </Flex>
        <Flex justify={"space-around"}>
          <Select
            w={175}
            label="Gender"
            placeholder="Select gender"
            data={["Male", "Female", "Other"]}
            {...form.getInputProps("gender")}
          />
          <TextInput
            w={175}
            label="Phone Number"
            placeholder="Phone Number"
            {...form.getInputProps("phoneNumber")}
          />
        </Flex>

        <Textarea
          label="Address"
          placeholder="Address"
          {...form.getInputProps("address")}
        />

        <Button type="submit" mt="md">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default AddStudentModal;
