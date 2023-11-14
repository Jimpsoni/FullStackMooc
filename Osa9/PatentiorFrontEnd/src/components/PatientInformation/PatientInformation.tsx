import { Gender, Patient, Entry } from "../../types";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import { OccupationalHealthcareComponent, HospitalEntryComponent, HealthCheckComponent } from "./Entries";

interface PatientInfoTypes {
  data: Patient | null | undefined;
}

interface ShowGenderTypes {
  gender: Gender;
}

interface EntryDetailsTypes {
  entry: Entry;
}

const ShowGender = (props: ShowGenderTypes) => {
  if (props.gender === Gender.Male) return <MaleIcon />;
  if (props.gender == Gender.Female) return <FemaleIcon />;
  return <TransgenderIcon />;
};

const EntryDetails = (props: EntryDetailsTypes) => {
  const entry = props.entry;

  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryComponent entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareComponent entry={entry} />;
    case "HealthCheck":
      return <HealthCheckComponent entry={entry} />;
    default:
      return;
  }
};

const PatientInformation = (props: PatientInfoTypes) => {
  const person = props.data;
  if (!person) return <h1>Could not find the data</h1>;

  return (
    <>
      <div>
        <h1>{person.name}</h1>
        <ShowGender gender={person.gender} />
      </div>
      <p>Date of birth: {person.dateOfBirth}</p>
      <p>occupation: {person.occupation}</p>
      <h2>Entries</h2>

      {person.entries.map((entry) => (
        <EntryDetails key={entry.id} entry={entry} />
      ))}
    </>
  );
};

export default PatientInformation;
