import { students } from "../data/students";
const initialState = {
  students: students,
};

const studentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_STUDENT": {
      const { id, data } = action.payload;
      return {
        ...state,
        students: state.students.map((student) =>
          student.id === id ? { ...student, ...data } : student
        ),
      };
    }

    case "DELETE_STUDENT": {
      const { id } = action.payload;
      return {
        ...state,
        students: state.students.filter((student) => student.id !== id),
      };
    }

    case "ADD_STUDENT": {
      const { newStudent } = action.payload;
      return {
        ...state,
        students: [...state.students, newStudent],
      };
    }

    default:
      return state;
  }
};

export default studentsReducer;
export const updateStudent = (id, data) => ({
  type: 'UPDATE_STUDENT',
  payload: { id, data },
});
export const deleteStudent = (id) => ({
  type: 'DELETE_STUDENT',
  payload: { id },
});
export const addStudent = (newStudent) => ({
  type: 'ADD_STUDENT',
  payload: { newStudent },
});