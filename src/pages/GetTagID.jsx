import React, { useContext } from 'react';
import { Context } from '../context/Context';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import wretch from 'wretch';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeployedURL } from '../components/Constants';
import UserProfileSidebar from '../components/UserProfileSidebar';
import { ThreeDots } from 'react-loading-icons';

function GetTagID() {
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

  //id from custom vision API
  const [id, setIdFromVision] = useState('');
  const [loadingRemoteID, setLoadingRemote] = useState(false);
  console.log(loadingRemoteID);
  const [imgUploadMsg, setImgUploadMsg] = useState('Upload Image');
  const [successMgs, setSuccessMgs] = useState(null);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState(null);
  const queryClient = useQueryClient();


  const registerPatientWithTag = () => {
    var myHeaders = new Headers();
    setLoadingRemote(true);
    myHeaders.append('Training-key', '4f4901caa8d443c49c1fbaea41bb7e82');

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      `https://customvisionpatientidentification.cognitiveservices.azure.com/customvision/v3.3/Training/projects/b59ec2ba-0423-42fb-b75c-7d2b3caa8d1c/tags?name=${formData.first_name}`,
      requestOptions,
    )
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setLoadingRemote(false);
        setIdFromVision(result.id);
      })
      .catch((error) => {
        setLoadingRemote(false);
        console.log('error', error);
      });
  };


  return (
    <div className='flex flex-row mt-60px md:h-full bg-base-200 '>
      <UserProfileSidebar />

      <main className='container my-3 justify-center items-center h-full m-auto'>
        <div className='mx-5'>
          <label className='label'>
            <span className='label-text'>Get Facial ID</span>{' '}
          </label>
          <input
            type='text'
            {...register('fullame', { required: true })}
            onChange={(e) =>
              setFormData({ ...formData, first_name: e.target.value })
            }
            placeholder='Patient Fullname'
            className='input input-bordered m-4px'
          />
          {errors.fullame?.type === 'required' && (
            <p className='label-text-alt text-red-400 pt-2'>
              Fullname is required 😶
            </p>
          )}
          {loadingRemoteID ? (
            <p className='label-text-alt text-red-400 pt-2'>Loading...</p>
          ) : (
            <button
              className='btn btn-outline btn-success max-w-md place-self-center ml-4'
              onClick={() => registerPatientWithTag()}
            >
              Get Id
            </button>
          )}
        </div>
        <div className="stat-title text-center m-5 font-bold text-success te">Patient Tag Id: {id}</div>
      </main>
    </div>
  );
}

export default GetTagID;
