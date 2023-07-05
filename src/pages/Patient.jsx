import { useEffect, useState } from "react";
import UserProfileSidebar from "../components/UserProfileSidebar";
import "../index.css";
import axios from "axios";
import { DeployedURL } from '../components/Constants';
import { Link, useLocation } from "react-router-dom";



function Patient() {
    const [patient, setPatient] = useState({});
    const [medicalHistory, setmedicalHistory] = useState([]);
    const id = useLocation().pathname.split("/")[2]


    useEffect(() => {
        const fetchPatientById = async () => {
            try {
                const res = await axios.get(`${DeployedURL}/patients/${id}`).then((response) => {
                    setPatient(response.data);
                })

            } catch (err) { }
        }
        const fetchPatientHistoryById = async () => {
            try {
                const res = await axios.get(`${DeployedURL}/medicalhistory/${id}`).then((response) => {
                    setmedicalHistory(response.data);
                })

            } catch (err) { }
        }

        fetchPatientHistoryById();


        fetchPatientById();

    }, []);

    return (
        <div className="flex flex-row mt-60px sm:h-fit md:h-full bg-base-200 ">
            <UserProfileSidebar />
            <main className='container  grid md:grid-rows-3 sm:grid-rows-1  h-full mx-2 mt-3'>
                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-title text-center m-5 font-bold text-success te">Personal Info</div>
                        <div className="text-xl text-primary">Name: <span className="text-info">{patient?.firstName + " " + patient?.lastName}</span></div>
                        <div className="text-xl text-primary">Age: <span className="text-info">30 yrs</span></div>
                        <div className="text-xl text-primary">Email: <span className="text-info">{patient.email}</span></div>
                        <div className="text-xl text-primary">Gender: <span className="text-info">Male</span></div>
                        <div className="text-xl text-primary">Phone: <span className="text-info">{patient.phone}</span></div>
                    </div>
                    <div className="stat">
                        <div className="stat-title text-center m-5 font-bold text-success ">Emergency Contact</div>
                        <div className="text-xl text-primary">Emergency Contact Name: <span className="text-info">{patient.emergencyContactName}</span></div>
                        <div className="text-xl text-primary">Emergency Contact Phone: <span className="text-info">{patient.emergencyContactPhone}</span></div>
                        <div className="text-xl text-primary">InsuranceProvider: <span className="text-info">{patient.insuranceProvider}</span></div>
                        <div className="text-xl text-primary">InsurancePolicyNumber: <span className="text-info">{patient.insurancePolicyNumber}</span></div>
                    </div>
                </div>

                <div className="shadow">
                    <button className="btn btn-outline btn-success max-w-md place-self-center ml-4 mt-4"><Link to={`/records/addMedication/${patient.facialID}`}>Add New Medication</Link></button>

                    <div className="stat-title text-center m-5 font-bold text-success text-3xl">Medical History</div>

                    <div className="overflow-x-auto w-full">

                        <table className="table w-full">

                            <thead>
                                <tr>
                                    <th>Reason</th>
                                    <th>Diagnosis</th>
                                    <th>Medication</th>
                                    <th>Recomendation</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {medicalHistory.length === 0 ? (
                                    <tr>
                                        <td colSpan="3" className="text-center">
                                            No records found
                                        </td>
                                    </tr>
                                ) : (
                                    medicalHistory.map((item) => (
                                        <>
                                            <tr >
                                                <td>
                                                    <div className="flex items-center space-x-3">
                                                        <div>
                                                            <div className="font-bold">{item.reasonForVisit}</div>

                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="flex items-center space-x-3">
                                                        <div>
                                                            <div className="font-bold">{item.diagnosis}</div>
                                                            <div className="text-sm opacity-50">Dry cough</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="flex items-center space-x-3">
                                                        <div>
                                                            <div className="font-bold"> {item.medicationsPrescribed}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    {item.treatmentPlan}
                                                    <br />
                                                    <span className="badge badge-ghost badge-sm">Avoid cold water</span>
                                                </td>
                                                <th>
                                                    <td>{item.dateOfVisit}</td>
                                                </th>
                                            </tr>
                                        </>
                                    ))
                                )}
                            </tbody>
                            <tfoot>
                            </tfoot>

                        </table>
                    </div>
                </div>
            </main >

        </div >
    );
}

export default Patient;
