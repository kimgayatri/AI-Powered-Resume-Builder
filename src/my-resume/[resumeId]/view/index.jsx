// import Header from '@/components/custom/Header'
// import { Button } from '@/components/ui/button'
// import { ResumeInfoContext } from '@/context/ResumeInfoContext'
// import ResumePreview from '@/dashboard/resume/components/ResumePreview'
// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import GlobalApi from './../../../../service/GlobalApi'
// import { RWebShare } from 'react-web-share'


// function ViewResume() {

//     const [resumeInfo,setResumeInfo]=useState();
//     const {resumeId}=useParams();

//     useEffect(()=>{
//         GetResumeInfo();
//     },[])
//     const GetResumeInfo=()=>{
//         GlobalApi.GetResumeById(resumeId).then(resp=>{
//             console.log(resp.data.data);
//             setResumeInfo(resp.data.data);
//         })
//     }
 
    
//     const HandleDownload=()=>{
//         window.print();
//     }

//   return (
//     <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}} >
//         <div id="no-print">
//         <Header/>

//         <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
//             <h2 className='text-center text-2xl font-medium'>
//                 Congrats! Your Ultimate AI generates Resume is ready ! </h2>
//                 <p className='text-center text-gray-400'>Now you are ready to download your resume and you can share unique 
//                     resume url with your friends and family </p>
//             <div className='flex justify-between px-44 my-10'>
//                 <Button onClick={HandleDownload}>Download</Button>
               
//                 <RWebShare
//         data={{
//           text: "Hello Everyone, This is my resume please open url to see it",
//           url: import.meta.env.VITE_BASE_URL+"/my-resume/"+resumeId+"/view",
//           title: resumeInfo?.firstName+" "+resumeInfo?.lastName+" resume",
//         }}
//         onClick={() => console.log("shared successfully!")}
//       > <Button>Share</Button>
//       </RWebShare>
//             </div>
//         </div>
            
//         </div>
//         <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
//         <div id="print-area" >
//                 <ResumePreview/>
//             </div>
//             </div>
//     </ResumeInfoContext.Provider>
//   )
// }

// export default ViewResume




// import Header from '@/components/custom/Header'
// import { Button } from '@/components/ui/button'
// import { ResumeInfoContext } from '@/context/ResumeInfoContext'
// import ResumePreview from '@/dashboard/resume/components/ResumePreview'
// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import GlobalApi from './../../../../service/GlobalApi'
// import { RWebShare } from 'react-web-share'
// import html2pdf from 'html2pdf.js';

// function ViewResume() {
//     const [resumeInfo, setResumeInfo] = useState();
//     const {resumeId} = useParams();
//     const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

//     useEffect(() => {
//         GetResumeInfo();
//     }, [])

//     const GetResumeInfo = () => {
//         GlobalApi.GetResumeById(resumeId).then(resp => {
//             setResumeInfo(resp.data.data);
//         })
//     }

//     const HandleDownload = async () => {
//         setIsGeneratingPDF(true);
//         try {
//             const element = document.getElementById('print-area');
//             if (!element) {
//                 console.error("Print area not found");
//                 return;
//             }

//             // Ensure content is fully rendered
//             await new Promise(resolve => setTimeout(resolve, 300));

//             const opt = {
//                 margin: 10,
//                 filename: `${resumeInfo?.firstName || 'resume'}.pdf`,
//                 html2canvas: { 
//                     scale: 2,
//                     useCORS: true,
//                     logging: true, // Helps debug rendering issues
//                     allowTaint: true,
//                     scrollX: 0,
//                     scrollY: 0
//                 },
//                 jsPDF: { 
//                     unit: 'mm', 
//                     format: 'a4', 
//                     orientation: 'portrait' 
//                 }
//             };

//             await html2pdf().set(opt).from(element).save();
//         } catch (error) {
//             console.error("PDF generation failed:", error);
//         } finally {
//             setIsGeneratingPDF(false);
//         }
//     };

//     return (
//         <ResumeInfoContext.Provider value={{resumeInfo, setResumeInfo}}>
//             <div id="no-print">
//                 <Header/>
//                 <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
//                     <h2 className='text-center text-2xl font-medium'>
//                         Congrats! Your Ultimate AI generates Resume is ready!
//                     </h2>
//                     <p className='text-center text-gray-400'>
//                         Now you are ready to download your resume and you can share unique 
//                         resume url with your friends and family
//                     </p>
//                     <div className='flex justify-between px-44 my-10'>
//                         <Button 
//                             onClick={HandleDownload}
//                             disabled={isGeneratingPDF}
//                         >
//                             {isGeneratingPDF ? 'Generating...' : 'Download'}
//                         </Button>
                       
                        // <RWebShare
                        //     data={{
                        //         text: "Hello Everyone, This is my resume please open url to see it",
                        //         url: import.meta.env.VITE_BASE_URL+"/my-resume/"+resumeId+"/view",
                        //         title: resumeInfo?.firstName+" "+resumeInfo?.lastName+" resume",
                        //     }}
                        //     onClick={() => console.log("shared successfully!")}
                        // >
                        //     <Button>Share</Button>
                        // </RWebShare>
//                     </div>
//                 </div>
//             </div>
//             <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
//                 <div id="print-area">
//                     <ResumePreview/>
//                 </div>
//             </div>
//         </ResumeInfoContext.Provider>
//     )
// }

// export default ViewResume




import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import ResumePreview from '@/dashboard/resume/components/ResumePreview'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../service/GlobalApi'
import { RWebShare } from 'react-web-share'
import html2pdf from 'html2pdf.js'

function ViewResume() {
    const [resumeInfo, setResumeInfo] = useState()
    const { resumeId } = useParams()
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

    useEffect(() => {
        GetResumeInfo()
    }, [])

    const GetResumeInfo = () => {
        GlobalApi.GetResumeById(resumeId).then(resp => {
            setResumeInfo(resp.data.data)
        })
    }

    const HandleDownload = async () => {
        setIsGeneratingPDF(true)
        try {
            const element = document.getElementById('print-area')
            if (!element) {
                console.error("Print area not found")
                return
            }

            // Ensure content is fully rendered
            await new Promise(resolve => setTimeout(resolve, 500))

            const opt = {
                margin: 10,
                filename: `${resumeInfo?.firstName || 'resume'}_resume.pdf`,
                html2canvas: { 
                    scale: 2,
                    useCORS: true,
                    logging: true,
                    allowTaint: true,
                    scrollX: 0,
                    scrollY: 0,
                    letterRendering: true
                },
                jsPDF: { 
                    unit: 'mm', 
                    format: 'a4', 
                    orientation: 'portrait',
                    hotfixes: ['px_scaling']
                }
            }

            // Generate PDF as blob
            const pdf = await html2pdf().set(opt).from(element).outputPdf('blob')

            // Modern browsers with File System Access API
            if ('showSaveFilePicker' in window) {
                try {
                    const handle = await window.showSaveFilePicker({
                        suggestedName: `${resumeInfo?.firstName || 'resume'}_resume.pdf`,
                        types: [{
                            description: 'PDF Files',
                            accept: { 'application/pdf': ['.pdf'] },
                        }],
                    })
                    
                    const writable = await handle.createWritable()
                    await writable.write(pdf)
                    await writable.close()
                    return
                } catch (err) {
                    if (err.name !== 'AbortError') {
                        console.log("File System Access API failed, falling back", err)
                    }
                }
            }

            // Fallback for other browsers
            const url = URL.createObjectURL(pdf)
            const link = document.createElement('a')
            link.href = url
            link.download = `${resumeInfo?.firstName || 'resume'}_resume.pdf`
            
            // Trigger click with metaKey to force save dialog in most browsers
            const clickEvent = new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true,
                metaKey: true
            })
            link.dispatchEvent(clickEvent)
            
            // Clean up
            setTimeout(() => {
                URL.revokeObjectURL(url)
            }, 100)

        } catch (error) {
            console.error("PDF generation failed:", error)
            alert("Failed to generate PDF. Please try again.")
        } finally {
            setIsGeneratingPDF(false)
        }
    }

    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            <div id="no-print">
                <Header />
                <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
                    <h2 className='text-center text-2xl font-medium'>
                        Congrats! Your Ultimate AI Generated Resume is Ready!
                    </h2>
                    <p className='text-center text-gray-400'>
                        Now you can download your resume and share the unique URL
                    </p>
                    <div className='flex justify-between px-44 my-10'>
                        <Button 
                            onClick={HandleDownload}
                            disabled={isGeneratingPDF}
                            className='min-w-[120px]'
                        >
                            {isGeneratingPDF ? 'Preparing...' : 'Download PDF'}
                        </Button>
                       
                        <RWebShare
                            data={{
                                text: "Hello Everyone, This is my resume please open url to see it",
                                url: import.meta.env.VITE_BASE_URL+"/my-resume/"+resumeId+"/view",
                                title: resumeInfo?.firstName+" "+resumeInfo?.lastName+" resume",
                            }}
                            onClick={() => console.log("shared successfully!")}
                        >
                            <Button>Share</Button>
                        </RWebShare>
                    </div>
                </div>
            </div>
            <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
                <div id="print-area" className='bg-white'>
                    <ResumePreview />
                </div>
            </div>
        </ResumeInfoContext.Provider>
    )
}

export default ViewResume

