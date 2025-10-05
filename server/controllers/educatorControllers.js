import { clerkClient } from '@clerk/express'
import {v2 as cloudinary} from 'cloudinary'
import Course from '../models/Course.js'

// update role to educator
export const updateRoleToEducator = async (req, res) => {
  try {
    console.log(req)
    const userId = req.auth.userId

    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata:{
        role: 'educator',
      }
    })

    res.json({ success: true, message: 'You can publish a course now' })
    
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

export const addCourse = async (req, res) => {
    try {
        const { courseData } = req.body
        const imageFile = req.file
        const educatorId = req.auth.userId

        if (!imageFile) { 
            return res.json({ success: false, message: 'Thumbnail Not Attached' })
        }

        const parsedCourseData = await JSON.parse(courseData)
        parsedCourseData.educator = educatorId
        const newCourse = await Course.create(parsedCourseData)
        const imageUplaod=await cloudinary.uploader.upload(imageFile.path)
        newCourse.courseThumbnail=imageUplaod.secure_url
        await newCourse.save()

        res.json({ success: true, message: 'Course Added Successfully' })

    } catch (error) {
        res.json({ success: false, message: error.message })
        console.log(error)
    }
}

//Get Educator Courses

export const getEducatorCourses = async (req, res) => {
  try{
      const educator = req.auth.userId
      const courses= await Course.find({educator  })
      res.json({success:true , courses})
  }
  catch(error){
      res.json({success:false , message:error.message})
  }
}