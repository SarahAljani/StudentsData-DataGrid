import * as React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import IconButton from "@mui/joy/IconButton";
import Table from "@mui/joy/Table";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function Row({ row }) {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <tr>
        <td>
          <IconButton
            aria-label="expand row"
            variant="plain"
            color="neutral"
            size="sm"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </td>
        <td style={{ width: "200px !important" }}>{row.fullName}</td>
        <td>{row.fatherName}</td>
        <td>{row.email}</td>
        <td>{row.academicStatus}</td>
        <td>{row.age}</td>
        <td>{row.city}</td>
        <td>{row.address}</td>
        <td>{row.gender}</td>
        <td>{row.phoneNumber}</td>
        <td>{row.phoneNumber}</td>
        <td>{row.phoneNumber}</td>
        <td>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button size="sm" variant="plain" color="neutral">
              Edit
            </Button>
            <Button size="sm" variant="soft" color="danger">
              Delete
            </Button>
          </Box>
        </td>
      </tr>
      {open && (
        <tr>
          <td colSpan={11} style={{ padding: 0 }}>
            <Sheet
              variant="soft"
              sx={{ p: 2, boxShadow: "inset 0 3px 6px rgba(0 0 0 / 0.08)" }}
            >
              <Typography level="body-lg" component="div" sx={{ pb: 1 }}>
                Courses
              </Typography>
              <Table
                borderAxis="bothBetween"
                size="sm"
                aria-label="courses"
                sx={{
                  "--TableCell-paddingX": "0.5rem",
                  "& th, & td": { textAlign: "left" },
                }}
              >
                <thead>
                  <tr>
                    <th>Course Name</th>
                    <th>Course Code</th>
                    <th>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {row.coursesEnrolled.map((course) => (
                    <tr key={course.code}>
                      <td>{course.name}</td>
                      <td>{course.code}</td>
                      <td>{course.grade}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Sheet>
          </td>
        </tr>
      )}
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    fatherName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    academicStatus: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    city: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    courses: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        code: PropTypes.string.isRequired,
        grade: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default function StudentsTable() {
  const [studentData, setStudentData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    axios
      .get("https://mocki.io/v1/f49f8532-0157-448b-bb8d-49ce28f00f74")
      .then((response) => {
        console.log(response);
        setStudentData([response.data]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ width: "100%" }}>
      <Sheet variant="outlined" sx={{ overflow: "auto" }}>
        <Table
          borderAxis="bothBetween"
          stripe="odd"
          hoverRow
          sx={{
            "& th, & td": {
              minWidth: "120px", // Set minimum width for all cells
            },
            "& tr > *:first-child": {
              position: "sticky",
              left: 0,
              boxShadow: "1px 0 var(--TableCell-borderColor)",
              bgcolor: "background.surface",
              zIndex: 1,
            },
            "& tr > *:last-child": {
              position: "sticky !important",
              right: 0,
              boxShadow: "-1px 0 var(--TableCell-borderColor)",
              bgcolor: "var(--TableCell-headBackground)",
              zIndex: 1,
            },
          }}
        >
          <thead>
            <tr>
              <th aria-label="expand" />
              <th>Full Name</th>
              <th>Father Name</th>
              <th>Email</th>
              <th>Academic Status</th>
              <th>Age</th>
              <th>City</th>
              <th>Address</th>
              <th>Gender</th>
              <th>Phone Number</th>
              <th>Phone Number</th>
              <th>Phone Number</th>
              <th aria-label="actions" />
            </tr>
          </thead>
          <tbody>
            {studentData.map((row) => (
              <Row key={row.id} row={row} />
            ))}
          </tbody>
        </Table>
      </Sheet>
    </Box>
  );
}
