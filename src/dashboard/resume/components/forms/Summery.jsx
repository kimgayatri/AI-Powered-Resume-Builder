// import { Button } from '@/components/ui/button'
// import { Textarea } from '@/components/ui/textarea'
// import { ResumeInfoContext } from '@/context/ResumeInfoContext'
// import React, { useContext, useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom';
// import GlobalApi from './../../../../../service/GlobalApi';
// import { Brain, LoaderCircle } from 'lucide-react';
// import { toast } from 'sonner';
// import { AIChatSession } from './../../../../../service/AIModal';

// const prompt = `Job Title: {jobTitle}

// Please provide 3 summaries for different experience levels (Senior, Mid, Fresher) in JSON array format. 
// Each item should have:
// - summary: (3-4 line summary)
// - experience_level: (Senior/Mid/Fresher)

// Example format:
// [
//   {
//     "experience_level": "Senior",
//     "summary": "Experienced professional with..."
//   },
//   {
//     "experience_level": "Mid",
//     "summary": "Skilled developer with..."
//   }
// ]`

// function Summery({ enabledNext }) {
//     const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
//     const [summery, setSummery] = useState();
//     const [loading, setLoading] = useState(false);
//     const params = useParams();
//     const [aiGeneratedSummeryList, setAiGenerateSummeryList] = useState([]);

//     useEffect(() => {
//         summery && setResumeInfo({
//             ...resumeInfo,
//             summery: summery
//         })
//     }, [summery])

//     const GenerateSummeryFromAI = async () => {
//         if (!resumeInfo?.jobTitle) {
//             toast.error("Please enter a job title first");
//             return;
//         }

//         setLoading(true);
//         try {
//             const PROMPT = prompt.replace('{jobTitle}', resumeInfo.jobTitle);
//             const result = await AIChatSession.sendMessage(PROMPT);
            
//             // Try to parse the response
//             let parsedResponse;
//             try {
//                 parsedResponse = JSON.parse(result.response.text());
//             } catch (parseError) {
//                 console.error("Failed to parse AI response:", parseError);
//                 throw new Error("AI returned invalid JSON format");
//             }

//             // Validate the response structure
//             if (!Array.isArray(parsedResponse)) {
//                 throw new Error("AI response is not an array");
//             }

//             const validSummaries = parsedResponse.filter(item => 
//                 item.experience_level && item.summary
//             );

//             if (validSummaries.length === 0) {
//                 throw new Error("No valid summaries found in response");
//             }

//             setAiGenerateSummeryList(validSummaries);
//             toast.success("AI summaries generated successfully");

//         } catch (error) {
//             console.error("AI Summary Generation Error:", error);
//             toast.error(`Failed to generate summaries: ${error.message}`);
//             setAiGenerateSummeryList([]);
//         } finally {
//             setLoading(false);
//         }
//     }

//     const onSave = (e) => {
//         e.preventDefault();
//         if (!summery) {
//             toast.error("Please enter a summary first");
//             return;
//         }

//         setLoading(true);
//         const data = {
//             data: {
//                 summery: summery
//             }
//         };

//         GlobalApi.UpdateResumeDetail(params?.resumeId, data)
//             .then(resp => {
//                 enabledNext(true);
//                 toast.success("Summary saved successfully");
//             })
//             .catch(error => {
//                 toast.error("Failed to save summary");
//                 console.error("Save Error:", error);
//             })
//             .finally(() => {
//                 setLoading(false);
//             });
//     }

//     return (
//         <div>
//             <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
//                 <h2 className='font-bold text-lg'>Summary</h2>
//                 <p>Add Summary for your job title</p>

//                 <form className='mt-7' onSubmit={onSave}>
//                     <div className='flex justify-between items-end'>
//                         <label>Add Summary</label>
//                         <Button 
//                             variant="outline" 
//                             onClick={GenerateSummeryFromAI}
//                             type="button" 
//                             size="sm" 
//                             className="border-primary text-primary flex gap-2"
//                             disabled={loading || !resumeInfo?.jobTitle}
//                         >
//                             {loading ? (
//                                 <LoaderCircle className='h-4 w-4 animate-spin' />
//                             ) : (
//                                 <>
//                                     <Brain className='h-4 w-4' /> 
//                                     Generate from AI
//                                 </>
//                             )}
//                         </Button>
//                     </div>
//                     <Textarea 
//                         className="mt-5" 
//                         required
//                         value={summery || resumeInfo?.summery || ''}
//                         onChange={(e) => setSummery(e.target.value)}
//                         placeholder="Enter your professional summary here..."
//                     />
//                     <div className='mt-2 flex justify-end'>
//                         <Button type="submit" disabled={loading}>
//                             {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
//                         </Button>
//                     </div>
//                 </form>
//             </div>

//             {aiGeneratedSummeryList.length > 0 && (
//                 <div className='my-5'>
//                     <h2 className='font-bold text-lg'>AI Suggestions</h2>
//                     {aiGeneratedSummeryList.map((item, index) => (
//                         <div 
//                             key={index}
//                             onClick={() => setSummery(item.summary)}
//                             className='p-5 shadow-lg my-4 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors'
//                         >
//                             <h2 className='font-bold my-1 text-primary'>
//                                 {item.experience_level} Level
//                             </h2>
//                             <p className='text-sm'>{item.summary}</p>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     )
// }

// export default Summery

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { Brain, LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import { AIChatSession } from './../../../../../service/AIModal';

const prompt = `Job Title: {jobTitle}

Please provide 3 summaries for different experience levels (Senior, Mid, Fresher) in JSON array format. 
Each item should have:
- summary: (3-4 line summary)
- experience_level: (Senior/Mid/Fresher)

Example format:
[
  {
    "experience_level": "Senior",
    "summary": "Experienced professional with..."
  },
  {
    "experience_level": "Mid",
    "summary": "Skilled developer with..."
  }
]`

function Summery({ enabledNext }) {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [summery, setSummery] = useState();
    const [aiLoading, setAiLoading] = useState(false);
    const [saveLoading, setSaveLoading] = useState(false);
    const params = useParams();
    const [aiGeneratedSummeryList, setAiGenerateSummeryList] = useState([]);

    useEffect(() => {
        summery && setResumeInfo({
            ...resumeInfo,
            summery: summery
        })
    }, [summery])

    const GenerateSummeryFromAI = async () => {
        if (!resumeInfo?.jobTitle) {
            toast.error("Please enter a job title first");
            return;
        }

        setAiLoading(true);
        try {
            const PROMPT = prompt.replace('{jobTitle}', resumeInfo.jobTitle);
            const result = await AIChatSession.sendMessage(PROMPT);
            
            // Try to parse the response
            let parsedResponse;
            try {
                parsedResponse = JSON.parse(result.response.text());
            } catch (parseError) {
                console.error("Failed to parse AI response:", parseError);
                throw new Error("AI returned invalid JSON format");
            }

            // Validate the response structure
            if (!Array.isArray(parsedResponse)) {
                throw new Error("AI response is not an array");
            }

            const validSummaries = parsedResponse.filter(item => 
                item.experience_level && item.summary
            );

            if (validSummaries.length === 0) {
                throw new Error("No valid summaries found in response");
            }

            setAiGenerateSummeryList(validSummaries);
            toast.success("AI summaries generated successfully");

        } catch (error) {
            console.error("AI Summary Generation Error:", error);
            toast.error(`Failed to generate summaries: ${error.message}`);
            setAiGenerateSummeryList([]);
        } finally {
            setAiLoading(false);
        }
    }

    const onSave = (e) => {
        e.preventDefault();
        if (!summery) {
            toast.error("Please enter a summary first");
            return;
        }

        setSaveLoading(true);
        const data = {
            data: {
                summery: summery
            }
        };

        GlobalApi.UpdateResumeDetail(params?.resumeId, data)
            .then(resp => {
                enabledNext(true);
                toast.success("Summary saved successfully");
            })
            .catch(error => {
                toast.error("Failed to save summary");
                console.error("Save Error:", error);
            })
            .finally(() => {
                setSaveLoading(false);
            });
    }

    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
                <h2 className='font-bold text-lg'>Summary</h2>
                <p>Add Summary for your job title</p>

                <form className='mt-7' onSubmit={onSave}>
                    <div className='flex justify-between items-end'>
                        <label>Add Summary</label>
                        <Button 
                            variant="outline" 
                            onClick={GenerateSummeryFromAI}
                            type="button" 
                            size="sm" 
                            className="border-primary text-primary flex gap-2"
                            disabled={aiLoading || !resumeInfo?.jobTitle}
                        >
                            {aiLoading ? (
                                <LoaderCircle className='h-4 w-4 animate-spin' />
                            ) : (
                                <>
                                    <Brain className='h-4 w-4' /> 
                                    Generate from AI
                                </>
                            )}
                        </Button>
                    </div>
                    <Textarea 
                        className="mt-5" 
                        required
                        value={summery || resumeInfo?.summery || ''}
                        onChange={(e) => setSummery(e.target.value)}
                        placeholder="Enter your professional summary here..."
                    />
                    <div className='mt-2 flex justify-end'>
                        <Button type="submit" disabled={saveLoading}>
                            {saveLoading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                        </Button>
                    </div>
                </form>
            </div>

            {aiGeneratedSummeryList.length > 0 && (
                <div className='my-5'>
                    <h2 className='font-bold text-lg'>AI Suggestions</h2>
                    {aiGeneratedSummeryList.map((item, index) => (
                        <div 
                            key={index}
                            onClick={() => setSummery(item.summary)}
                            className='p-5 shadow-lg my-4 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors'
                        >
                            <h2 className='font-bold my-1 text-primary'>
                                {item.experience_level} Level
                            </h2>
                            <p className='text-sm'>{item.summary}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Summery