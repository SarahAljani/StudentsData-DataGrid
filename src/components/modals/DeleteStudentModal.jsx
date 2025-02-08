import { Button, Text } from "@mantine/core";
import { Box } from "@mui/joy";
const DeleteStudentModal = ({ id, close, onDeleteSuccess }) => {
  return (
    <>
      <Text size="l">Are you sure you want to delete this student data ?!</Text>
      <Box display={"flex"} gap={"10px"} mt={2}>
        <Button color="red" onClick={onDeleteSuccess(id)}>
          Delete Student
        </Button>
        <Button color="#887" onClick={close}>
          Cancel
        </Button>
      </Box>
    </>
  );
};
export default DeleteStudentModal;
