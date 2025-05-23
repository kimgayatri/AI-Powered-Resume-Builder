// import { Loader2, PlusSquare } from 'lucide-react';
// import React, { useState } from 'react';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { v4 as uuidv4 } from 'uuid';
// import GlobalApi from './../../../service/GlobalApi';
// import { useUser } from '@clerk/clerk-react';
// import { useNavigate } from 'react-router-dom';

// function AddResume() {
//   const [openDialog, setOpenDialog] = useState(false);
//   const [resumeTitle, setResumeTitle] = useState('');
//   const { user } = useUser();
//   const [loading, setLoading] = useState(false);
//   const navigation = useNavigate();

//   const onCreate = async () => {
//     if (!resumeTitle) return;

//     setLoading(true);
//     const uuid = uuidv4();

//     const data = {
//       data: {
//         title: resumeTitle,
//         resumeId: uuid,
//         userEmail: user?.primaryEmailAddress?.emailAddress || 'unknown@email.com',
//         userName: user?.fullName || 'Anonymous'
//       }
//     };

//     GlobalApi.CreateNewResume(data).then(resp => {
//       const docId = resp?.data?.data?.documentId;
//       if (docId) {
//         setLoading(false);
//         navigation(`/dashboard/resume/${docId}/edit`);
//       }
//     }).catch(error => {
//       console.error(error);
//       setLoading(false);
//     });
//   };

//   return (
//     <div>
//       <div
//         className='p-14 py-24 border items-center flex justify-center bg-secondary rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed'
//         onClick={() => setOpenDialog(true)}
//       >
//         <PlusSquare />
//       </div>

//       <Dialog open={openDialog} onOpenChange={setOpenDialog}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Create New Resume</DialogTitle>
//             <DialogDescription>
//               <p>Add a title for your new resume</p>
//               <Input
//                 className="my-2"
//                 placeholder="Ex. Full Stack Resume"
//                 onChange={(e) => setResumeTitle(e.target.value)}
//               />
//             </DialogDescription>
//             <div className='flex justify-end gap-5'>
//               <Button onClick={() => setOpenDialog(false)} variant="ghost">Cancel</Button>
//               <Button disabled={!resumeTitle || loading} onClick={onCreate}>
//                 {loading ? <Loader2 className='animate-spin' /> : 'Create'}
//               </Button>
//             </div>
//           </DialogHeader>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

// export default AddResume;



import { Loader2, PlusSquare } from 'lucide-react'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { v4 as uuidv4 } from 'uuid';
import GlobalApi from './../../../service/GlobalApi'
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'

function AddResume() {
  const [openDialog, setOpenDialog] = useState(false)
  const [resumeTitle, setResumeTitle] = useState('')
  const { user } = useUser()
  const [loading, setLoading] = useState(false)
  const navigation = useNavigate()

  const onCreate = async () => {
    if (!resumeTitle) return
    
    setLoading(true)
    const uuid = uuidv4()
    const data = {
      data: {
        title: resumeTitle,
        resumeId: uuid,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName
      }
    }

    try {
      const resp = await GlobalApi.CreateNewResume(data)
      if (resp?.data?.data?.documentId) {
        navigation(`/dashboard/resume/${resp.data.data.documentId}/edit`)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div 
        className='p-14 py-24 border items-center flex justify-center bg-secondary rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed'
        onClick={() => setOpenDialog(true)}
      >
        <PlusSquare />
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription className="space-y-2"> {/* Added space-y-2 for spacing */}
              Add a title for your new resume {/* Removed <p> tag */}
              <Input 
                className="my-2" 
                placeholder="Ex. Full Stack resume"
                onChange={(e) => setResumeTitle(e.target.value)}
              />
            </DialogDescription>
            <div className='flex justify-end gap-5 mt-4'>
              <Button onClick={() => setOpenDialog(false)} variant="ghost">
                Cancel
              </Button>
              <Button 
                disabled={!resumeTitle || loading}
                onClick={onCreate}
              >
                {loading ? <Loader2 className='animate-spin' /> : 'Create'}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddResume