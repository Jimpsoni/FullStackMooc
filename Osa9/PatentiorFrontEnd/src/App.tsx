import { useState, useEffect } from "react";
import { useMatch } from "react-router-dom";
import axios from "axios";
import { Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";

import { apiBaseUrl } from "./constants";
import { Patient } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientInformation from "./components/PatientInformation/PatientInformation";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const match = useMatch("/patients/:id");
  const patientInfo = match
    ? patients.find((note) => note.id === match.params.id)
    : null;

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);

  return (
    <div className="App">
      <Container>
        <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
          Patientor
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Home
        </Button>
        <Divider hidden />
        <Routes>
          <Route
            path="/"
            element={
              <PatientListPage patients={patients} setPatients={setPatients} />
            }
          />
          <Route
            path="/patients/:id"
            element={<PatientInformation data={patientInfo} />}
          />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
