import React, { use, useEffect, useRef, useState } from 'react'
import uniqid from 'uniqid'
import Quill from 'quill'
import { assets } from '../../assets/assets';

const Addcourse = () => {
  const quillref = useRef(null);
  const editorref = useRef(null);

  // States for course creation
  const [courseTitle, setCourseTitle] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [showPopup, setShowPopup] = useState(false);    
  const [currentChapterId, setCurrentChapterId] = useState(null);
  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: "",
    lectureDuration: '',
    lectureUrl: "",
    isPreviewFree: false,
  });

  const addLecture = () => {
  setChapters(
    chapters.map((chapter) => {
      if (chapter.chapterId === currentChapterId) {
        const newLecture = {
          ...lectureDetails,
          lectureOrder: chapter.chapterContent.length > 0 ? chapter.
            chapterContent.slice(-1)[0].lectureOrder + 1 : 1,
          lectureId: uniqid()
        };
        chapter.chapterContent.push(newLecture);
      }
      return chapter;
    })
  );
  setShowPopup(false);
  setLectureDetails({
    lectureTitle: '',
    lectureDuration: '',
    lectureUrl: '',
    isPreviewFree: false,
  });
}; 
const handlesubmit=(e)=>{
    e.preventDefault();
}

  const handleChapter = (action, chapterId) => {
    if (action === 'add') {
      const title = prompt('Enter Chapter Name:');
      if (title) {
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false,
          chapterOrder: chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1,
        };
        setChapters([...chapters, newChapter]);
      }
    } else if (action === 'remove') {
      setChapters(chapters.filter((chapter) => chapter.chapterId !== chapterId));

    } else if (action === 'toggle') {
      setChapters(
        chapters.map((chapter) =>
          chapter.chapterId === chapterId ? {
            ...chapter, collapsed: !chapter.
              collapsed
          } : chapter
        )
      );
    }
  };
  const handleLecture = (action, chapterId, lectureIndex) => {
    if (action === 'add') {
      setCurrentChapterId(chapterId);
      setShowPopup(true);
    } else if (action === 'remove') {
      setChapters(
        chapters.map((chapter) => {
          if (chapter.chapterId === chapterId) {
            chapter.chapterContent.splice(lectureIndex, 1);
          }
          return chapter;
        })
      );
    }
  }
  useEffect(() => {
    if (!quillref.current && editorref.current) {
      quillref.current = new Quill(editorref.current, {
        theme: 'snow',
      });
    }
  }, []);

  return (
    <div className="p-6 pt-24">
      <h1 className="text-2xl font-bold mb-8 text-gray-800">Create New Course</h1>
      <form onSubmit={handlesubmit} className="bg-white rounded-xl shadow-md p-6 space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Course Title</label>
          <input 
            onChange={e => setCourseTitle(e.target.value)} 
            value={courseTitle}
            type='text' 
            placeholder='Enter course title' 
            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-colors' 
            required 
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Course Description</label>
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <div ref={editorref} className="min-h-[200px]"></div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className='space-y-2'>
            <label className="text-sm font-semibold text-gray-700">Course Price ($)</label>
            <input 
              onChange={e => setCoursePrice(e.target.value)} 
              value={coursePrice} 
              type="number" 
              placeholder='0' 
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-colors' 
              required 
            />
          </div>
          <div className='space-y-2'>
            <label className="text-sm font-semibold text-gray-700">Discount (%)</label>
            <input 
              onChange={e => setDiscount(e.target.value)} 
              value={discount} 
              type="number" 
              placeholder='0' 
              min={0} 
              max={100} 
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-colors' 
              required 
            />
          </div>
        </div>
        
        <div className='space-y-2'>
          <label className="text-sm font-semibold text-gray-700">Course Thumbnail</label>
          <label htmlFor='thumbnailImage' className='flex items-center gap-4 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-cyan-500 cursor-pointer transition-colors'>
            <div className='flex items-center justify-center w-12 h-12 bg-cyan-100 rounded-lg'>
              <img src={assets.file_upload_icon} alt="" className='w-6 h-6' />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Click to upload thumbnail</p>
              <p className="text-xs text-gray-500">PNG, JPG up to 2MB</p>
            </div>
            <input type="file" id='thumbnailImage' onChange={e => setImage(e.target.files[0])} accept="image/*" hidden />
            {image && (
              <img className='w-16 h-16 object-cover rounded-lg ml-auto' src={URL.createObjectURL(image)} alt="Preview" />
            )}
          </label>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">Course Content</h3>
            <button 
              type="button"
              onClick={() => handleChapter('add')}
              className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors duration-200 flex items-center gap-2"
            >
              <img src={assets.add_icon} alt="" className="w-4 h-4" />
              Add Chapter
            </button>
          </div>
          {chapters.map((chapter, chapterIndex) => (
            <div key={chapterIndex} className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
              <div className="flex justify-between items-center p-4 bg-white border-b border-gray-200">
                <div 
                  className="flex items-center cursor-pointer"
                  onClick={() => handleChapter('toggle', chapter.chapterId)}
                >
                  <img 
                    src={assets.dropdown_icon} 
                    width={16} 
                    alt="" 
                    className={`mr-3 transition-transform duration-200 ${chapter.collapsed && "-rotate-90"}`} 
                  />
                  <span className="font-semibold text-gray-800">
                    Chapter {chapterIndex + 1}: {chapter.chapterTitle}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                    {chapter.chapterContent.length} Lectures
                  </span>
                  <button
                    type="button"
                    onClick={() => handleChapter('remove', chapter.chapterId)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <img src={assets.cross_icon} alt="" className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {!chapter.collapsed && (
                <div className="p-4 space-y-3 bg-gray-50">
                  {chapter.chapterContent.map((lecture, lectureIndex) => (
                    <div key={lectureIndex} className="flex justify-between items-center p-3 bg-white border border-gray-200 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-gray-800">
                            {lectureIndex + 1}. {lecture.lectureTitle}
                          </span>
                          {lecture.isPreviewFree && (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                              Free Preview
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>{lecture.lectureDuration} mins</span>
                          <a href={lecture.lectureUrl} target="_blank" className="text-cyan-600 hover:text-cyan-800">
                            View Link
                          </a>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleLecture('remove', chapter.chapterId, lectureIndex)}
                        className="text-red-500 hover:text-red-700 transition-colors p-1"
                      >
                        <img src={assets.cross_icon} alt="" className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleLecture('add', chapter.chapterId)}
                    className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-cyan-500 hover:text-cyan-600 transition-colors duration-200"
                  >
                    + Add Lecture
                  </button>
                </div>
              )}

            </div>
          ))}


          {showPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Add New Lecture</h2>
                  <button
                    type="button"
                    onClick={() => setShowPopup(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <img src={assets.cross_icon} alt="" className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Lecture Title</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                      value={lectureDetails.lectureTitle}
                      onChange={(e) => setLectureDetails({
                        ...lectureDetails,
                        lectureTitle: e.target.value
                      })}
                      placeholder="Enter lecture title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                      value={lectureDetails.lectureDuration}
                      onChange={(e) => setLectureDetails({
                        ...lectureDetails,
                        lectureDuration: e.target.value
                      })}
                      placeholder="Enter duration"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Lecture URL</label>
                    <input
                      type="url"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                      value={lectureDetails.lectureUrl}
                      onChange={(e) => setLectureDetails({
                        ...lectureDetails,
                        lectureUrl: e.target.value
                      })}
                      placeholder="Enter lecture URL"
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isPreviewFree"
                      className="w-4 h-4 text-cyan-600 bg-gray-100 border-gray-300 rounded focus:ring-cyan-500"
                      checked={lectureDetails.isPreviewFree}
                      onChange={(e) => setLectureDetails({
                        ...lectureDetails,
                        isPreviewFree: e.target.checked
                      })}
                    />
                    <label htmlFor="isPreviewFree" className="ml-2 text-sm text-gray-700">
                      Allow free preview
                    </label>
                  </div>
                </div>
                
                <div className="flex gap-3 mt-6">
                  <button 
                    type="button"
                    onClick={() => setShowPopup(false)}
                    className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="button"
                    onClick={addLecture}
                    className="flex-1 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
                  >
                    Add Lecture
                  </button>
                </div>
              </div>
            </div>
          )

          }
        </div>
        <div className="flex justify-end pt-6 border-t border-gray-200">
          <button 
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Create Course
          </button>
        </div>
      </form>
    </div>
  )
}

export default Addcourse