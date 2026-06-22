import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { VscPackage } from "react-icons/vsc"

import RenderCartCourses from "./RenderCartCourses"
import RenderTotalAmount from "./RenderTotalAmount"

export default function Cart() {
  const { total, totalItems } = useSelector((state) => state.cart)
  const { paymentLoading } = useSelector((state) => state.course)

  if (paymentLoading)
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="spinner"></div>
      </div>
    )

  return (
    <>
      <div className="mb-2">
        <h1 className="text-3xl font-semibold text-richblack-50">Cart</h1>
        <p className="mt-2 text-sm text-richblack-300">
          Review your selected courses before checkout.
        </p>
      </div>

      {total > 0 ? (
        <>
          <p className="mt-8 border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400">
            {totalItems} {totalItems === 1 ? "Course" : "Courses"} in Cart
          </p>
          <div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
            <RenderCartCourses />
            <RenderTotalAmount />
          </div>
        </>
      ) : (
        <div className="mt-10 flex min-h-[50vh] flex-col items-center justify-center rounded-2xl border border-dashed border-richblack-600 bg-richblack-800/40 px-6 py-16 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-richblack-700 ring-8 ring-richblack-700/40">
            <VscPackage className="text-4xl text-yellow-50" />
          </div>
          <h2 className="text-2xl font-semibold text-richblack-5">
            Your cart is empty
          </h2>
          <p className="mt-3 max-w-md text-base leading-relaxed text-richblack-300">
            You have not added any courses yet. Browse the catalog and add
            courses you want to learn.
          </p>
          <Link
            to="/"
            className="mt-8 rounded-lg bg-yellow-50 px-6 py-3 text-sm font-semibold text-richblack-900 transition-all duration-200 hover:scale-95 hover:bg-yellow-100"
          >
            Browse Courses
          </Link>
        </div>
      )}
    </>
  )
}
