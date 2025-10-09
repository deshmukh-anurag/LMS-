import mongoose from "mongoose";

const lectureSchema=new mongoose.Schema({
    lectureId:{type:String, required:true},
    lectureUrl:{type:String, required:true},
    lectureTitle:{type:String, required:true},
    isPreviewFree:{type:Boolean, required:true},
    lectureDuration:{type:Number, required:true},
    lectureOrder:{type:Number, required:true}
},{_id:false})
const chapterSchema=new mongoose.Schema({
    chapterId:{type:String, required:true},
    chapterOrder:{type:Number, required:true},
    chapterTitle:{type:String, required:true},
    chapterContent:[lectureSchema]
},{_id:false})

const courseSchema=new mongoose.Schema({
    courseTitle:{
        type:String,
        required:true},

        courseDescription:{
            type:String,
            required:true
        },

        courseThumbnail:{
            type:String,
            required:true
        },

        courseDuration:{
            type:String,
            required:true
        },

        coursePrice:{
            type:Number,
            required:true
        },

        isPublished:{
            type:Boolean,
            required:true
        },

        discount:{
            type:Number,
            required:true,
            min:0,
            max:100
        },

        courseContent:{
            type:Array,
            required:true
        },

        courseRating:[
            {userId:{
                type:String,
                required:true
            },
            rating:{
                type:Number, min:0,max:5
            }
        }
    ],

        educator:{
            type:String,
            ref:'User',
            required: true
        },

        enrolledStudents:{
            type:String,
            ref:'User' 
        }

},{timestamps:true,minimize:false});

const Course=mongoose.model('course',courseSchema);

export default Course;