// import React, { useEffect, useState } from 'react'
// import AddResume from './components/AddResume'
// import { useUser } from '@clerk/clerk-react'
// import GlobalApi from './../../service/GlobalApi';
// import ResumeCardItem from './components/ResumeCardItem';

// function Dashboard() {
//   const { user } = useUser();
//   const [resumeList, setResumeList] = useState([]);
//   const [loading, setLoading] = useState(true); // Add loading state

//   useEffect(() => {
//     if (user) {
//       GetResumesList();
//     }
//   }, [user])

//   const GetResumesList = () => {
//     setLoading(true); // Start loading
//     GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress)
//       .then(resp => {
//         // Make sure response data exists before setting it
//         setResumeList(resp.data?.data || []);
//       })
//       .catch(error => {
//         console.error("Error fetching resumes:", error);
//         setResumeList([]); // Set empty array on error
//       })
//       .finally(() => {
//         setLoading(false); // Stop loading regardless of success/error
//       });
//   }

//   return (
//     <div className='p-10 md:px-20 lg:px-32'>
//       <h2 className='font-bold text-3xl'>My Resume</h2>
//       <p>Start Creating AI resume to your next Job role</p>
//       <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-10'>
//         <AddResume />
        
//         {loading ? (
//           // Show loading skeletons while data is being fetched
//           [1, 2, 3, 4].map((item, index) => (
//             <div key={index} className='h-[280px] rounded-lg bg-slate-200 animate-pulse'></div>
//           ))
//         ) : resumeList.length > 0 ? (
//           // Show actual resume cards when data is available
//           resumeList.map((resume, index) => (
//             <ResumeCardItem resume={resume} key={resume.id || index} refreshData={GetResumesList} />
//           ))
//         ) : (
//           // Show empty state if no resumes found
//           <div className="col-span-full text-center py-10 text-gray-500">
//             No resumes found. Create your first resume!
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default Dashboard

// import React, { useEffect, useState } from 'react'
// import AddResume from './components/AddResume'
// import { useUser } from '@clerk/clerk-react'
// import GlobalApi from './../../service/GlobalApi';
// import ResumeCardItem from './components/ResumeCardItem';

// function Dashboard() {

//   const {user}=useUser();
//   const [resumeList,setResumeList]=useState([]);
//   useEffect(()=>{
//     user&&GetResumesList()
//   },[user])

//   /**
//    * Used to Get Users Resume List
//    */
//   const GetResumesList=()=>{
//     GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress)
//     .then(resp=>{
//       console.log(resp.data.data)
//       setResumeList(resp.data.data);
//     })
//   }
//   return (
//     <div className='p-10 md:px-20 lg:px-32'>
//       <h2 className='font-bold text-3xl'>My Resume</h2>
//       <p>Start Creating AI resume to your next Job role</p>
//       <div className='grid grid-cols-2 
//       md:grid-cols-3 lg:grid-cols-5 gap-5
//       mt-10
//       '>
//         <AddResume/>
//         {resumeList.length>0?resumeList.map((resume,index)=>(
//           <ResumeCardItem resume={resume} key={index} refreshData={GetResumesList} />
//         )):
//         [1,2,3,4].map((item,index)=>(
//           <div className='h-[280px] rounded-lg bg-slate-200 animate-pulse'>
//           </div>
//         ))
//         }
//       </div>
//     </div>
//   )
// }

// export default Dashboard

import React, { useEffect, useState } from 'react'
import AddResume from './components/AddResume'
import { useUser } from '@clerk/clerk-react'
import GlobalApi from './../../service/GlobalApi'
import ResumeCardItem from './components/ResumeCardItem'

function Dashboard() {
  const { user } = useUser()
  const [resumeList, setResumeList] = useState([])

  useEffect(() => {
    if (user) {
      GetResumesList()
    }
  }, [user])

  // Used to Get User's Resume List
  const GetResumesList = async () => {
    try {
      const resp = await GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress)
      console.log(resp.data.data)
      setResumeList(resp.data.data)
    } catch (error) {
      console.error("Failed to fetch resumes:", error)
    }
  }

  return (
    <div className='p-10 md:px-20 lg:px-32'>
      <h2 className='font-bold text-3xl'>My Resume</h2>
      <p>Start Creating AI resume for your next Job role</p>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-10'>
        <AddResume />
        {resumeList.length > 0 ? (
          resumeList.map((resume, index) => (
            <ResumeCardItem resume={resume} key={index} refreshData={GetResumesList} />
          ))
        ) : (
          [1, 2, 3, 4].map((item, index) => (
            <div
              key={index}
              className='h-[280px] rounded-lg bg-slate-200 animate-pulse'
            ></div>
          ))
        )}
      </div>
    </div>
  )
}

export default Dashboard
