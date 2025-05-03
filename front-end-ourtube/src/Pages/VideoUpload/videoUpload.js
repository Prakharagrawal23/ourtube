import React, { useState, useEffect } from 'react'
import './videoUpload.css';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
const VideoUpload = () => {
    const [inputField, setInputField] = useState({ "title": "", "description": "", "videoLink": "", "thumbnail": "", "videoType": "" })
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate()
    const handleOnChangeInput = (event, name) => {
        setInputField({
            ...inputField, [name]: event.target.value
        })
    }


    const uploadImage = async (e, type) => {

        console.log("Uploading")
        const files = e.target.files;

        const data = new FormData();
        data.append('file', files[0]);
        // // youtube-clone
        data.append('upload_preset', 'youtube-clone');
        setLoader(true)
        try {
            // cloudName="dg9zauqnn"
            // setProgressBar(true)
            const response = await axios.post(`https://api.cloudinary.com/v1_1/dg9zauqnn/${type}/upload`, data)
            // console.log(response)
            // setProgressBar(false)
            const url = response.data.url;

            console.log(url)
            // setUploadedImageUrl(imageUrl);
            let val = type === "image" ? "thumbnail" : "videoLink"
            setInputField({
                ...inputField, [val]: url
            })
        } catch (err) {
            // setLoader(false)
            console.log(err)
        } finally {
            setLoader(false); // Always hide loader after upload attempt
        }


    }

    useEffect(() => {
        let isLogin = localStorage.getItem("userId");
        if (isLogin === null) {
            navigate('/')
        }
    }, [])
    console.log(inputField)
    const handleSubmitFunc = async () => {
        setLoader(true)
        await axios.post('http://localhost:4000/api/video',inputField,{withCredentials:true}).then((resp=>{
            console.log(resp)
            setLoader(false)
            navigate('/')
        })).catch(err=>{
            console.log(err)
            setLoader(false)
        })

    }
    console.log(inputField)


    return (
        <div className='videoUpload'>
            <div className="uploadBox">
                <div className="uploadVideoTitle">
                    <YouTubeIcon sx={{ fontSize: "54px", color: "red" }} />
                    Upload Video
                </div>

                <div className="uploadForm">
                    {/*done---------------*/}

                    <input type='text' value={inputField.title} onChange={(e) => { handleOnChangeInput(e, "title") }} placeholder='Title of Video' className='uploadFormInputs' />
                    <input type='text' value={inputField.description} onChange={(e) => { handleOnChangeInput(e, "description") }} placeholder='Description' className='uploadFormInputs' />
                    <input type='text' value={inputField.videoType} onChange={(e) => { handleOnChangeInput(e, "videoType") }} placeholder='Category' className='uploadFormInputs' />


                    {/* <input type='text' placeholder='Title of Video' className='uploadFormInputs' />
                    <input type='text' placeholder='Description' className='uploadFormInputs' />
                    <input type='text' placeholder='Category' className='uploadFormInputs' /> */}
                    <div>thumbnail<input type='file' accept='image/*' onChange={(e) => uploadImage(e, "image")} /></div>
                    <div>video <input type='file' accept='video/mp4, video/webm, video/*' onChange={(e) => uploadImage(e, "video")} /></div>

                    {
                        loader && <Box sx={{ display: 'flex' }}>
                            <CircularProgress />
                        </Box>
                    }
                </div>

                <div className="uploadBtns">
                    {/* <div className="uploadBtn-form" onClick={handleSubmitFunc}>Upload</div> */}
                    <div className="uploadBtn-form" onClick={handleSubmitFunc} >Upload</div>
                    <Link to={'/'} className="uploadBtn-form">Home</Link>

                </div>
            </div>
        </div>
    )
}

export default VideoUpload