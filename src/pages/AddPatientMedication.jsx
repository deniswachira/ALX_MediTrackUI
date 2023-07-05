import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import { useForm } from "react-hook-form";
import wretch from "wretch";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeployedURL } from '../components/Constants';
import UserProfileSidebar from "../components/UserProfileSidebar";
import { ThreeDots } from 'react-loading-icons'
import { useLocation } from "react-router-dom";
import axios from "axios";

function AddPatientMedication() {
    const { user } = useContext(Context);
    const authToken = user?.accessToken;
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [imgUploadMsg, setImgUploadMsg] = useState("Upload Image");
    const [successMgs, setSuccessMgs] = useState(null);
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState(null);
    const queryClient = useQueryClient();
    const patientId = useLocation().pathname.split("/")[3]
    const [patient, setPatient] = useState([]);


    const RegisterPatientMutation = useMutation({
        mutationFn: async (data) => {
            wretch(`${DeployedURL}/medicalhistory/add`)
                .headers(authToken)
                .post(data).json()
                .then((data) => {
                    setSuccessMgs(data);
                    reset();
                    queryClient.invalidateQueries('AllPatient');
                    setTimeout(() => setSuccessMgs(false), 4000);
                    // setTimeout(() => setImgUploadMsg("Upload Image"), 4000);
                })
                .catch(error => { setError(error); setTimeout(() => setError(false), 3000); })
        }
    })


    useEffect(() => {
        const fetchPatientById = async () => {
            try {
                const res = await axios.get(`${DeployedURL}/patients/${patientId}`).then((response) => {
                    setPatient(response.data);
                    // console.log(response.data);

                })

            } catch (err) { }
        }
        fetchPatientById();

    }, []);

    const onSubmit = async (data) => {
        data.facialID = patientId;
        RegisterPatientMutation.mutate(data);

        // console.log(data)
    };


    return (
        <div className="flex flex-row mt-60px md:h-full bg-base-200 ">
            <UserProfileSidebar />
            {
                RegisterPatientMutation.isLoading ? (
                    <ThreeDots stroke="#98ff98" strokeOpacity={.125} speed={.75} />
                ) : (
                    error ? (
                        <div className="alert alert-error mt-60px shadow-lg w-fit z-50 text-center text-white absolute top-0 right-0" >
                            <div><span className='text-2xl'>😒</span>
                                <span>Error!registering Patient Medication</span>
                            </div>
                        </div >
                    ) : (
                        successMgs && (
                            <div className="alert alert-success mt-60px shadow-lg w-fit z-50 text-center text-white absolute top-0 right-0" >
                                <div><span className='text-2xl'>😎</span>
                                    <span>Patient Medication added Successfully</span>
                                </div>
                            </div >
                        )
                    )
                )

            }
            <main className="container my-3 justify-center items-center h-full m-auto">
                <main className="bg-base-200 mt-60px">
                    <div className="hero  bg-base-200">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="hero-content flex-col ">
                                <div className="card ">
                                    <div className="stat-title text-center m-5 font-bold text-success text-3xl">{patient.firstName + " " + patient.lastName} New Medication Record</div>

                                    <div className="card-body md:flex-row sm:flex-col lg:flex-row">
                                        <div >
                                            <label className="label">  <span className="label-text">DateOfVisit mm/dd/year</span> </label>
                                            <input type="text"  {...register("dateOfVisit", { required: true })} onChange={e => setFormData({ ...formData, dateOfVisit: e.target.value })}
                                                placeholder="date" className="input input-bordered"
                                            />
                                            {errors.dateOfVisit?.type === "required" && (
                                                <p className="label-text-alt text-red-400 pt-2">
                                                    dateOfVisit is required 😶
                                                </p>
                                            )}
                                            <label className="label">  <span className="label-text">treatmentPlan</span> </label>
                                            <input type="text"  {...register("treatmentPlan", { required: true })} onChange={e => setFormData({ ...formData, treatmentPlan: e.target.value })}
                                                placeholder="treatmentPlan" className="input input-bordered"
                                            />
                                            {errors.treatmentPlan?.type === "required" && (
                                                <p className="label-text-alt text-red-400 pt-2">
                                                    treatmentPlan is required 😶
                                                </p>
                                            )}
                                            <label className="label">  <span className="label-text">chronicConditions</span> </label>
                                            <input type="text"  {...register("chronicConditions", { required: false })} onChange={e => setFormData({ ...formData, chronicConditions: e.target.value })}
                                                placeholder="chronicConditions" className="input input-bordered"
                                            />
                                            {errors.chronicConditions?.type === "required" && (
                                                <p className="label-text-alt text-red-400 pt-2">
                                                    chronicConditions is required 😶
                                                </p>
                                            )}
                                        </div>
                                        <div >
                                            <label className="label"><span className="label-text">ReasonForVisit</span> </label>
                                            <input type="text" {...register("reasonForVisit", { required: true })} onChange={e => setFormData({ ...formData, reasonForVisit: e.target.value })}
                                                placeholder="reasonForVisit" className="input input-bordered"
                                            />
                                            {errors.reasonForVisit?.type === "required" && (
                                                <p className="label-text-alt text-red-400 pt-2">
                                                    reasonForVisit is required 😶
                                                </p>
                                            )}

                                            <label className="label"><span className="label-text">Prescription eg: panadol 1^3</span> </label>
                                            <input type="text" {...register("medicationsPrescribed", { required: true })} onChange={e => setFormData({ ...formData, medicationsPrescribed: e.target.value })}
                                                placeholder="medicationsPrescribed" className="input input-bordered"
                                            />
                                            {errors.medicationsPrescribed?.type === "required" && (
                                                <p className="label-text-alt text-red-400 pt-2">
                                                    medicationsPrescribed is required 😶
                                                </p>
                                            )}


                                        </div>
                                        <div>
                                            <label className="label"> <span className="label-text">Diagnosis</span></label>
                                            <input type="text"  {...register("diagnosis", { required: true })} onChange={e => setFormData({ ...formData, diagnosis: e.target.value })}
                                                placeholder="diagnosis" className="input input-bordered"
                                            />
                                            {errors.diagnosis?.type === "required" && (
                                                <p className="label-text-alt text-red-400 pt-2">
                                                    diagnosis is required 😶
                                                </p>
                                            )}
                                            <label className="label"><span className="label-text">Allergies</span> </label>
                                            <input type="text" {...register("allergies", { required: false })} onChange={e => setFormData({ ...formData, allergies: e.target.value })}
                                                placeholder="allergies" className="input input-bordered"
                                            />
                                            {errors.allergies?.type === "required" && (
                                                <p className="label-text-alt text-red-400 pt-2">
                                                    allergies is required 😶
                                                </p>
                                            )}
                                            <label className="label">  <span className="label-text">FamilyMedicalHistory</span> </label>
                                            <input type="text"  {...register("familyMedicalHistory", { required: false })} onChange={e => setFormData({ ...formData, familyMedicalHistory: e.target.value })}
                                                placeholder="familyMedicalHistory" className="input input-bordered"
                                            />
                                            {errors.familyMedicalHistory?.type === "required" && (
                                                <p className="label-text-alt text-red-400 pt-2">
                                                    familyMedicalHistory is required 😶
                                                </p>
                                            )}

                                        </div>
                                    </div>
                                    <div className="form-control mt-3 grid">
                                        <button type="submit" className="btn btn-outline btn-success max-w-md place-self-center w-full" >
                                            Add New Patient Medication
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </main>
            </main>
        </div>
    );
}

export default AddPatientMedication;