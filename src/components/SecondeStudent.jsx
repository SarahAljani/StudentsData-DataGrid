import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Table from "@mui/joy/Table";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { Collapse } from "@mui/material";
import axios from "axios";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/joy/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import AddStudentModal from "./modals/AddStudentModal";
import { useDisclosure } from "@mantine/hooks";
import { Flex, Modal, Paper, ScrollArea } from "@mantine/core";
import React, { useState } from "react";
import UpdateStudentModal from "./modals/UpdateStudentModal";
import DeleteStudentModal from "./modals/DeleteStudentModal";
import { deleteStudent } from "../redux/studentsReducer";
export default function SecondeStudent() {
  const reduxData = useSelector((state) => state.students.students);
  const [studentData, setStudentData] = useState(reduxData);
  const [loading, setLoading] = React.useState(true);
  const [openRow, setOpenRow] = React.useState(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [id, setId] = useState(null);
  const [openedUpdate, { open: openUpdate, close: closeUpdate }] =
    useDisclosure(false);
  const [openedDelete, { open: openDelete, close: closeDelete }] =
    useDisclosure(false);
  const dispatch = useDispatch();
  const handleDeleteSuccess = () => {
    dispatch(deleteStudent(id));
    closeDelete();
  };
  React.useEffect(() => {
    setStudentData(reduxData);
  }, [reduxData]);
  React.useEffect(() => {
    axios
      .get("https://mocki.io/v1/f49f8532-0157-448b-bb8d-49ce28f00f74")
      .then(() => {
        // setStudentData([...studentData, response.data]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <Typography>Loading...</Typography>;
  const handleUpdate = (id) => {
    setId(id);
    openUpdate();
  };
  const handleDelete = (id) => {
    setId(id);
    openDelete();
  };
  return (
    <Paper p={50} mx={75} radius={"xl"}>
      <Box sx={{ width: "100%" }}>
        <Modal
          opened={opened}
          onClose={close}
          title="add student"
          scrollAreaComponent={ScrollArea.Autosize}
        >
          <AddStudentModal close={close} />
        </Modal>
        <Flex justify={"center"} my={25}>
          <Button onClick={open}>Open modal</Button>
        </Flex>

        <Sheet
          variant="outlined"
          sx={(theme) => ({
            "--TableCell-height": "40px",
            "--TableHeader-height": "calc(1 * var(--TableCell-height))",
            "--Table-firstColumnWidth": "80px",
            "--Table-lastColumnWidth": "144px",
            "--TableRow-stripeBackground": "rgba(0 0 0 / 0.04)",
            "--TableRow-hoverBackground": "rgba(0 0 0 / 0.08)",
            overflow: "auto",
            borderRadius: "10px",
            background: `linear-gradient(to right, ${theme.vars.palette.background.surface} 30%, rgba(255, 255, 255, 0)),
            linear-gradient(to right, rgba(255, 255, 255, 0), ${theme.vars.palette.background.surface} 70%) 0 100%,
            radial-gradient(
              farthest-side at 0 50%,
              rgba(0, 0, 0, 0.12),
              rgba(0, 0, 0, 0)
            ),
            radial-gradient(
                farthest-side at 100% 50%,
                rgba(0, 0, 0, 0.12),
                rgba(0, 0, 0, 0)
              )
              0 100%`,
            backgroundSize:
              "40px calc(100% - var(--TableCell-height)), 40px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height))",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "local, local, scroll, scroll",
            backgroundPosition:
              "var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height), var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height)",
            backgroundColor: "background.surface",
          })}
        >
          <Table
            borderAxis="bothBetween"
            stripe="odd"
            hoverRow
            sx={{
              "& tr > *:first-of-type": {
                position: "sticky",
                left: 0,
                boxShadow: "1px 0 var(--TableCell-borderColor)",
                bgcolor: "background.surface",
              },
              "& tr > *:last-child": {
                position: "sticky",
                right: 0,
                bgcolor: "var(--TableCell-headBackground)",
              },
            }}
          >
            <thead>
              <tr>
                <th style={{ width: 50 }}>Courses enrollment</th>
                <th style={{ width: 50 }}>Full Name</th>
                <th style={{ width: 50 }}>Father Name</th>
                <th style={{ width: 50 }}>Email</th>
                <th style={{ width: 50 }}>Academic Status</th>
                <th style={{ width: 50 }}>Age</th>
                <th style={{ width: 50 }}>City</th>
                <th style={{ width: 50 }}>Address</th>
                <th style={{ width: 50 }}>Gender</th>
                <th style={{ width: 50 }}>Phone Number</th>
                <th style={{ width: 50 }}>Actions</th>
              </tr>
            </thead>
            {studentData.map((row, index) => (
              <tbody key={index}>
                <tr>
                  <td style={{ backgroundColor: "#ececec !important" }}>
                    <IconButton
                      aria-label="expand row"
                      variant="contained"
                      style={{ color: "#262e30", backgroundColor: "#1eabce" }}
                      size="sm"
                      onClick={() =>
                        setOpenRow(
                          openRow === row.fullName ? null : row.fullName
                        )
                      }
                    >
                      {openRow === row.fullName ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  </td>
                  <td>{row.fullName.substring(0, 10)}..</td>
                  <td>{row.fatherName.substring(0, 10)}..</td>
                  <td>{row.email.substring(0, 5)}..</td>
                  <td>{row.academicStatus.substring(0, 10)}..</td>
                  <td>{row.age}..</td>
                  <td>{row.city.substring(0, 10)}..</td>
                  <td>{row.address.substring(0, 10)}..</td>
                  <td>{row.gender}..</td>
                  <td>{row.phoneNumber.substring(0, 10)}..</td>
                  <td>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 1,
                      }}
                    >
                      <MdEdit
                        style={{
                          width: "20px",
                          height: "20px",
                          color: "#1eabce",
                        }}
                        onClick={() => handleUpdate(row.id)}
                      />

                      <FaRegTrashAlt
                        style={{
                          width: "19px",
                          height: "19px",
                          color: "#be0c06",
                        }}
                        onClick={() => handleDelete(row.id)}
                      />
                    </Box>
                  </td>
                </tr>
                <tr style={{ padding: 0, display: `${openRow ? "" : "none"}` }}>
                  <td colSpan={11}>
                    <Collapse in={openRow === row.fullName}>
                      <Sheet
                        variant="soft"
                        sx={{
                          p: 2,
                          boxShadow: "inset 0 3px 6px rgba(0 0 0 / 0.08)",
                        }}
                      >
                        <Typography
                          level="body-lg"
                          sx={{ pb: 1, ml: 1 }}
                          style={{ textAlign: "left" }}
                        >
                          Courses
                        </Typography>
                        <Table
                          size="sm"
                          aria-label="courses"
                          sx={{
                            "--TableCell-paddingX": "20px",
                            backgroundColor: "#ffffff",
                            "& tr": { backgroundColor: "#ffffff" },
                            "& th, & td": {
                              textAlign: "left",
                              backgroundColor: "#ffffff",
                              borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                            },
                          }}
                        >
                          <thead>
                            <tr>
                              <th style={{ width: 170 }}>Course Name</th>
                              <th>Course Progress</th>
                              <th style={{ backgroundColor: "#fff" }}>Grade</th>
                            </tr>
                          </thead>
                          <tbody>
                            {row.coursesEnrolled?.map((course, index) => (
                              <tr key={index}>
                                <td>{course.courseName}</td>
                                <td>
                                  <div
                                    style={{
                                      color:
                                        course.isFinished == false
                                          ? "#0069e0"
                                          : "#119400",
                                      border:
                                        course.isFinished != null
                                          ? `1px solid ${
                                              course.isFinished == false
                                                ? "#0069e0"
                                                : "#119400"
                                            }`
                                          : "",
                                      textAlign: "center",
                                      borderRadius: "10px",
                                      padding: "2px 15px",
                                      display: "inline-block",
                                    }}
                                  >
                                    {course.isFinished
                                      ? "Completed"
                                      : "In Progress"}
                                  </div>
                                </td>
                                <td style={{ backgroundColor: "#fff" }}>
                                  <div
                                    style={{
                                      color:
                                        course.grade > 60 ? "green" : "red",
                                      border:
                                        course.grade != null
                                          ? `1px solid ${
                                              course.grade > 60
                                                ? "green"
                                                : "red"
                                            }`
                                          : "",
                                      textAlign: "center",
                                      borderRadius: "10px",
                                      padding: "2px 15px",
                                      display: "inline-block",
                                    }}
                                  >
                                    {course.grade != null
                                      ? course.grade
                                      : "---"}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot>
                            <tr>
                              <td colSpan="2" style={{ fontWeight: "bold" }}>
                                Average Grade
                              </td>
                              <td
                                style={{
                                  backgroundColor: "#fff",
                                  fontWeight: "bold",
                                }}
                              >
                                {(() => {
                                  const validGrades = (
                                    row.coursesEnrolled || []
                                  )
                                    .map((course) => course.grade)
                                    .filter((grade) => grade !== null);

                                  const averageGrade =
                                    validGrades.length > 0
                                      ? (
                                          validGrades.reduce(
                                            (acc, grade) => acc + grade,
                                            0
                                          ) / validGrades.length
                                        ).toFixed(2)
                                      : "N/A";

                                  return averageGrade + "%";
                                })()}
                              </td>
                            </tr>
                          </tfoot>
                        </Table>
                      </Sheet>
                    </Collapse>
                  </td>
                </tr>
              </tbody>
            ))}
          </Table>
        </Sheet>
      </Box>
      <Modal
        opened={openedUpdate}
        onClose={closeUpdate}
        title="update student"
        scrollAreaComponent={ScrollArea.Autosize}
      >
        <UpdateStudentModal close={closeUpdate} studentId={id} />
      </Modal>
      <Modal
        opened={openedDelete}
        onClose={closeDelete}
        scrollAreaComponent={ScrollArea.Autosize}
      >
        <DeleteStudentModal
          close={closeDelete}
          studentId={id}
          onDeleteSuccess={() => handleDeleteSuccess}
        />
      </Modal>
    </Paper>
  );
}
