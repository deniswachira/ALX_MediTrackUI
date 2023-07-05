import React, { useContext } from 'react';
import { Context } from '../context/Context';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import wretch from 'wretch';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeployedURL } from '../components/Constants';
import UserProfileSidebar from '../components/UserProfileSidebar';
import { ThreeDots } from 'react-loading-icons';

function AddPatient() {
  const { user } = useContext(Context);
  const authToken = user?.accessToken;
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);



  const [imgUploadMsg, setImgUploadMsg] = useState('Upload Image');
  const [successMgs, setSuccessMgs] = useState(null);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState(null);
  const queryClient = useQueryClient();

  const RegisterPatientMutation = useMutation({
    mutationFn: async (data) => {
      wretch(`${DeployedURL}/patients/add`)
        .headers(authToken)
        .post(data)
        .json()
        .then((data) => {
          setSuccessMgs(data);
          reset();
          queryClient.invalidateQueries('AllPatient');
          setTimeout(() => setSuccessMgs(false), 4000);
          // setTimeout(() => setImgUploadMsg("Upload Image"), 4000);
        })
        .catch((error) => {
          setError(error);
          setTimeout(() => setError(false), 3000);
        });
    },
  });


  const onSubmit = async (data) => {

    RegisterPatientMutation.mutate(data);
    // console.log(data)
  };

  return (
    <div className='flex flex-row mt-60px md:h-full bg-base-200 '>
      <UserProfileSidebar />
      {RegisterPatientMutation.isLoading ? (
        <ThreeDots stroke='#98ff98' strokeOpacity={0.125} speed={0.75} />
      ) : error ? (
        <div className='alert alert-error mt-60px shadow-lg w-fit z-50 text-center text-white absolute top-0 right-0'>
          <div>
            <span className='text-2xl'>😒</span>
            <span>Error!registering Patient</span>
          </div>
        </div>
      ) : (
        successMgs && (
          <div className='alert alert-success mt-60px shadow-lg w-fit z-50 text-center text-white absolute top-0 right-0'>
            <div>
              <span className='text-2xl'>😎</span>
              <span>Patient registered Successfully</span>
            </div>
          </div>
        )
      )}
      <main className='container my-3 justify-center items-center h-full m-auto'>
        <main className='bg-base-200 mt-60px'>
          <div className='hero  bg-base-200'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='hero-content flex-col '>
                <div className='card '>
                  <div className='card-body md:flex-row sm:flex-col lg:flex-row'>
                    <div>
                      <label className='label'>
                        {' '}
                        <span className='label-text'>First Name</span>{' '}
                      </label>
                      <input
                        type='text'
                        {...register('firstName', { required: true })}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            first_name: e.target.value,
                          })
                        }
                        placeholder='First Name'
                        className='input input-bordered'
                      />
                      {errors.firstName?.type === 'required' && (
                        <p className='label-text-alt text-red-400 pt-2'>
                          First Name is required 😶
                        </p>
                      )}
                      <label className='label'>
                        {' '}
                        <span className='label-text'>Last Name</span>{' '}
                      </label>
                      <input
                        type='text'
                        {...register('lastName', { required: true })}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            last_name: e.target.value,
                          })
                        }
                        placeholder='Last Name'
                        className='input input-bordered'
                      />
                      {errors.lastName?.type === 'required' && (
                        <p className='label-text-alt text-red-400 pt-2'>
                          Last Name is required 😶
                        </p>
                      )}
                      <label className='label'>
                        {' '}
                        <span className='label-text'>Blood Group</span>{' '}
                      </label>
                      <select
                        {...register('bloodType', { required: true })}
                        className='select select-bordered w-full max-w-xs'
                      >
                        <option selected disabled value=''>
                          Select Blood Group
                        </option>
                        <option value='A'>A</option>
                        <option value='B'>B</option>
                        <option value='AB'>AB</option>
                        <option value='O'>O</option>
                      </select>
                      {errors.bloodType?.type === 'required' && (
                        <p className='label-text-alt text-red-400 pt-2'>
                          BG is required 😶
                        </p>
                      )}
                      <label className='label'>
                        <span className='label-text'>Facial ID</span>{' '}
                      </label>
                      <input
                        type='text'
                        {...register('facialID', { required: true })}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            facialID: e.target.value,
                          })
                        }
                        placeholder='facialID'
                        className='input input-bordered'
                      />
                    </div>
                    <div>
                      <label className='label'>
                        <span className='label-text'>Email</span>{' '}
                      </label>
                      <input
                        type='text'
                        {...register('email', { required: true })}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder='Email'
                        className='input input-bordered'
                      />
                      {errors.email?.type === 'required' && (
                        <p className='label-text-alt text-red-400 pt-2'>
                          Email is required 😶
                        </p>
                      )}

                      <label className='label'>
                        <span className='label-text'>Phone</span>{' '}
                      </label>
                      <input
                        type='text'
                        {...register('phone', { required: true })}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder='Phone No'
                        className='input input-bordered'
                      />
                      {errors.phone?.type === 'required' && (
                        <p className='label-text-alt text-red-400 pt-2'>
                          Phone Number is required 😶
                        </p>
                      )}
                      <label className='label'>
                        {' '}
                        <span className='label-text'>Insurance Name</span>{' '}
                      </label>
                      <input
                        type='text'
                        {...register('insuranceProvider', { required: false })}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            insurance_name: e.target.value,
                          })
                        }
                        placeholder='Insurance Name'
                        className='input input-bordered'
                      />
                      {errors.insuranceProvider?.type === 'required' && (
                        <p className='label-text-alt text-red-400 pt-2'>
                          Insurance Name is required 😶
                        </p>
                      )}
                      <label className='label'>
                        {' '}
                        <span className='label-text'>
                          emergencyContactPhone
                        </span>{' '}
                      </label>
                      <input
                        type='text'
                        {...register('emergencyContactPhone', {
                          required: false,
                        })}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            insurance_name: e.target.value,
                          })
                        }
                        placeholder='Insurance Name'
                        className='input input-bordered'
                      />
                      {errors.emergencyContactPhone?.type === 'required' && (
                        <p className='label-text-alt text-red-400 pt-2'>
                          emergencyContactPhone is required 😶
                        </p>
                      )}
                    </div>
                    <div>
                      <label className='label'>
                        {' '}
                        <span className='label-text'>Address</span>
                      </label>
                      <input
                        type='text'
                        {...register('address', { required: true })}
                        onChange={(e) =>
                          setFormData({ ...formData, age: e.target.value })
                        }
                        placeholder='Adress'
                        className='input input-bordered'
                      />
                      {errors.address?.type === 'required' && (
                        <p className='label-text-alt text-red-400 pt-2'>
                          Address is required 😶
                        </p>
                      )}
                      <label className='label'>
                        <span className='label-text'>Insurance No:</span>{' '}
                      </label>
                      <input
                        type='text'
                        {...register('insurancePolicyNumber', {
                          required: false,
                        })}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            insurance_no: e.target.value,
                          })
                        }
                        placeholder='Insurance no'
                        className='input input-bordered'
                      />
                      {errors.insurancePolicyNumber?.type === 'required' && (
                        <p className='label-text-alt text-red-400 pt-2'>
                          Insurance Number is required 😶
                        </p>
                      )}

                      <label className='label'>
                        <span className='label-text'>
                          emergencyContactName:
                        </span>{' '}
                      </label>
                      <input
                        type='text'
                        {...register('emergencyContactName', {
                          required: false,
                        })}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            insurance_no: e.target.value,
                          })
                        }
                        placeholder='Insurance no'
                        className='input input-bordered'
                      />
                      {errors.emergencyContactName?.type === 'required' && (
                        <p className='label-text-alt text-red-400 pt-2'>
                          emergencyContactName is required 😶
                        </p>
                      )}
                    </div>
                  </div>
                  <div className='form-control mt-3 grid'>
                    <button
                      type='submit'
                      className='btn btn-outline max-w-md place-self-center w-full'
                    >
                      Add New Patient
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

export default AddPatient;
