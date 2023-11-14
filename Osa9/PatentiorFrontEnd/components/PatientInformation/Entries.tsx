import { Entry, Diagnosis, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from "../../types";
import { useState, useEffect } from "react";
import axios from "axios";

interface HospitalEntryTypes {
  entry: HospitalEntry;
}

interface OccupationalTypes {
  entry: OccupationalHealthcareEntry;
}

interface HealthCheckTypes {
  entry: HealthCheckEntry;
}

interface ShowDiagnosisCodesTypes {
  codes: string[] | undefined;
  diagnoseCodes: Diagnosis[] | undefined;
}

interface BaseComponentTypes {
  entry: Entry;
}

const entryStyle = {
  border: "3px solid #303030",
  padding: "15px 15px 15px 15px",
  borderRadius: "15px",
  marginBottom: "15px"
};

const ShowDiagnosisCodes = (props: ShowDiagnosisCodesTypes) => {
  if (!props.codes) return;

  const fullDiagnoses = props.codes.map((code) => {
    if (!props.diagnoseCodes) return code;
    const name = props.diagnoseCodes.find((d) => d.code === code);
    return `${code}: ${name?.name}`;
  });

  return fullDiagnoses.map((code) => <li key={code}>{code}</li>);
};

const BaseComponent = (props: BaseComponentTypes) => {
  const entry = props.entry;

  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/diagnoses")
      .then((res) => setDiagnoses(res.data));
  }, []);

  if (!diagnoses) return <h1>Could not find the data</h1>;

  return (
    <div key={entry.id}>
      <div>{entry.date}</div>
      <div>{entry.description}</div>
      <ShowDiagnosisCodes codes={entry.diagnosisCodes} diagnoseCodes={diagnoses}/>
      <div>Diagnose by {entry.specialist}</div>
    </div>
  );
};

export const HospitalEntryComponent = (props: HospitalEntryTypes) => {
  const entry = props.entry;

  return (
    <div style={entryStyle} >
      <BaseComponent entry={entry} />
      <br></br>
      <div>Discharge: {entry.discharge.date}</div>
      <div>Criteria: {entry.discharge.criteria}</div>
    </div>
  );
};

export const OccupationalHealthcareComponent = (props: OccupationalTypes) => {
  const entry = props.entry;
  let sickleave;
  if (entry.sickLeave) {
    sickleave = () => <div>Sickleave {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</div>;
  } else {
    sickleave = () => (<>No sickleave</>);
  }

  return (
    <div style={entryStyle}>
      <BaseComponent entry={entry} />
      <br/>
      <div>Employer name: {entry.employerName}</div>
      <div>{sickleave()}</div>
    </div>
  );
};

export const HealthCheckComponent = (props: HealthCheckTypes) => {
  const entry = props.entry;

  return (
    <div style={entryStyle}>
      <BaseComponent entry={entry} />
      <div>Healthcheck Rating: {entry.healthCheckRating}</div>
    </div>
  );
};

export default "Default export ";
