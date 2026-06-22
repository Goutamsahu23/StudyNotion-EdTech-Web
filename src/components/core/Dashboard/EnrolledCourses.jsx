import { useEffect, useState } from "react"
import ProgressBar from "@ramonak/react-progress-bar"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { VscBook } from "react-icons/vsc"

import { getUserEnrolledCourses } from "../../../services/operations/profileAPI"

const defaultThumbnail =
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1024&h=576&fit=crop"

export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [enrolledCourses, setEnrolledCourses] = useState(null)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await getUserEnrolledCourses(token) // Getting all the published and the drafted courses

        // Filtering the published course out
        const filterPublishCourse = res.filter((ele) => ele.status !== "Draft")
        // console.log(
        //   "Viewing all the couse that is Published",
        //   filterPublishCourse
        // )

        setEnrolledCourses(filterPublishCourse)
      } catch (error) {
        console.log("Could not fetch enrolled courses.")
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="mb-2">
        <h1 className="text-3xl font-semibold text-richblack-50">
          Enrolled Courses
        </h1>
        <p className="mt-2 text-sm text-richblack-300">
          Track your learning progress across all purchased courses.
        </p>
      </div>

      {!enrolledCourses ? (
        <div className="flex min-h-[50vh] items-center justify-center py-16">
          <div className="spinner"></div>
        </div>
      ) : !enrolledCourses.length ? (
        <div className="mt-10 flex min-h-[50vh] flex-col items-center justify-center rounded-2xl border border-dashed border-richblack-600 bg-richblack-800/40 px-6 py-16 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-richblack-700 ring-8 ring-richblack-700/40">
            <VscBook className="text-4xl text-yellow-50" />
          </div>
          <h2 className="text-2xl font-semibold text-richblack-5">
            No enrolled courses yet
          </h2>
          <p className="mt-3 max-w-md text-base leading-relaxed text-richblack-300">
            You have not enrolled in any course yet. Explore the catalog, add
            courses to your cart, and start learning today.
          </p>
          <Link
            to="/"
            className="mt-8 rounded-lg bg-yellow-50 px-6 py-3 text-sm font-semibold text-richblack-900 transition-all duration-200 hover:scale-95 hover:bg-yellow-100"
          >
            Explore Courses
          </Link>
        </div>
      ) : (
        <div className="my-8 text-richblack-5">
          {/* Headings */}
          <div className="flex rounded-t-lg bg-richblack-500 ">
            <p className="w-[45%] px-5 py-3">Course Name</p>
            <p className="w-1/4 px-2 py-3">Duration</p>
            <p className="flex-1 px-2 py-3">Progress</p>
          </div>
          {/* Course Names */}
          {enrolledCourses.map((course, i, arr) => (
            <div
              className={`flex items-center border border-richblack-700 ${
                i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
              }`}
              key={i}
            >
              <div
                className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                onClick={() => {
                  navigate(
                    `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                  )
                }}
              >
                <img
                  src={course.thumbnail}
                  alt="course_img"
                  className="h-14 w-14 rounded-lg object-cover"
                  onError={(e) => {
                    e.currentTarget.src = defaultThumbnail
                  }}
                />
                <div className="flex max-w-xs flex-col gap-2">
                  <p className="font-semibold">{course.courseName}</p>
                  <p className="text-xs text-richblack-300">
                    {course.courseDescription.length > 50
                      ? `${course.courseDescription.slice(0, 50)}...`
                      : course.courseDescription}
                  </p>
                </div>
              </div>
              <div className="w-1/4 px-2 py-3">{course?.totalDuration}</div>
              <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                <p>Progress: {course.progressPercentage || 0}%</p>
                <ProgressBar
                  completed={course.progressPercentage || 0}
                  height="8px"
                  isLabelVisible={false}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
