import React from 'react';
import UserProfileSidebar from '../components/UserProfileSidebar';
import '../index.css';
import { Link } from 'react-router-dom';
const model_name = 'patients-model4';


function Dashboard() {
  const [loadingState, setLoadingState] = React.useState(false);
  //example

  const [userResult, setUserResult] = React.useState(null);
  const [imageUrl, setImageURL] = React.useState();
  const [fileTypeSelectedError, setFileTypeSelectedError] = React.useState();
  //image upload code
  const onImageThumbSelectedChange = (event) => {
    var files = event.target.files;
    var filesArr = Array.prototype.slice.call(files);

    if (!filesArr[0]?.type.includes('image/')) {
      setFileTypeSelectedError('Wrong image format.');

      setImageURL(null);
    } else {
      //code to upload scan data
      handleUploadScanImage(filesArr);
    }
    event.target.value = '';
  };
  const handleUploadScanImage = (filesArr) => {
    setLoadingState(true);
    var myHeaders = new Headers();
    myHeaders.append('Prediction-Key', '344bec173fd84a2dba415152888ad7a9');

    var formdata = new FormData();
    formdata.append('data', filesArr[0], filesArr[0].name);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch(
      `https://customvisionpatientidentification-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/b59ec2ba-0423-42fb-b75c-7d2b3caa8d1c/classify/iterations/${model_name}/image`,
      requestOptions,
    )
      .then((response) => {
        setLoadingState(false);
        return response.json();
      })
      .then((result) => {
        setLoadingState(false);
        setUserResult(result);

      })
      .catch((error) => {
        setLoadingState(false);
        console.log('error', error);
      });
  };

  return (
    <div className='flex flex-row mt-60px sm:h-fit md:h-full bg-base-200 '>
      <UserProfileSidebar />
      <main className='container gap-5 md:h-full sm:h-full mx-2 mb-3'>

        <div className='stats shadow flex flex-auto mt-4'>
          <div className='stat place-items-center'>
            <div className='stat-title'>Total Medication Records</div>
            <div className='stat-value'>31K</div>
          </div>

          <div className='stat place-items-center'>
            <div className='stat-title'>Total Patients</div>
            <div className='stat-value '>4,200</div>
            <div className='stat-desc '>↗︎ 40 (2%)</div>
          </div>

          <div className='stat place-items-center'>
            <div className='stat-title'>New patients</div>
            <div className='stat-value text-secondary'>1,200</div>
          </div>
        </div>


        <div className='divider'></div>

        <div className='flex'>
          <label>
            <input
              style={{ display: 'none', cursor: 'pointer' }}
              type='file'
              onChange={onImageThumbSelectedChange}
              onSelect={onImageThumbSelectedChange}
              id='input'
              accept='image/*'
            />
            <div className='grid h-20 flex-grow card bg-base-300 rounded-box place-items-center'>
              <div
                style={{
                  border: '2px solid black',
                  padding: '8px 8px',
                  borderRadius: '8px',
                  margin: '0px 16px',
                  cursor: 'pointer',
                }}
              >
                Scan
              </div>
            </div>
          </label>
          <div className='divider divider-horizontal'></div>
          <div className='grid h-20 flex-grow card  rounded-box place-items-center'>
            {loadingState && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                  margin: '16px',
                }}
              >
                <span style={{ margin: 'auto' }}>
                  <strong>Loading...</strong>
                </span>
              </div>
            )}

            <table style={{ margin: '8px' }} className='table w-full'>
              {userResult && Array.isArray(userResult?.predictions) ? (
                <thead>
                  <tr>
                    <th>User name</th>
                    <th>Prediction</th>
                    <th>Records Link</th>
                  </tr>
                </thead>
              ) : (
                <div style={{ margin: '16px', color: 'skyblue', fontSize: '25px' }}>
                  Your scan results will appear here ...
                </div>
              )}
              <tbody>
                {userResult &&
                  Array.isArray(userResult?.predictions) &&
                  userResult?.predictions?.map((result, index) => {
                    return (

                      <tr key={userResult.tagId}>
                        <td> {result.tagName}</td>
                        <td>
                          <strong>
                            {Number(result.probability * 100).toFixed(2)}%
                          </strong>
                        </td>
                        <td>
                          {' '}
                          <button className="btn btn-outline btn-success place-self-center "><Link to={`/records/${result.tagId}`}>View</Link></button>
                        </td>
                      </tr>

                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
