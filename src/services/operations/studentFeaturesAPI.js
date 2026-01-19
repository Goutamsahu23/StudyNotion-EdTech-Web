import { toast } from "react-hot-toast"

import rzpLogo from "../../assets/Logo/rzp_logo.png"
import { resetCart } from "../../slices/cartSlice"
import { setPaymentLoading } from "../../slices/courseSlice"
import { apiConnector } from "../apiConnector"
import { studentEndpoints } from "../apis"

const {
  COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
} = studentEndpoints

// Load the Razorpay SDK from the CDN
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script")
    script.src = src
    script.onload = () => {
      resolve(true)
    }
    script.onerror = () => {
      resolve(false)
    }
    document.body.appendChild(script)
  })
}

// Buy the Course
export async function BuyCourse(
  token,
  courses,
  user_details,
  navigate,
  dispatch
) {
  const toastId = toast.loading("Loading...")
  try {
    // Loading the script of Razorpay SDK
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

    if (!res) {
      toast.error(
        "Razorpay SDK failed to load. Check your Internet Connection."
      )
      return
    }

    // Initiating the Order in Backend
    const orderResponse = await apiConnector(
      "POST",
      COURSE_PAYMENT_API,
      {
        courses,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    )

    if (!orderResponse.data.success) {
      throw new Error(orderResponse.data.message)
    }
    console.log("PAYMENT RESPONSE FROM BACKEND............", orderResponse.data)

    // Check if Razorpay key is configured
    if (!process.env.RAZORPAY_KEY) {
      toast.dismiss(toastId)
      toast.error("Payment gateway is not configured. Please contact support.")
      console.error("RAZORPAY_KEY is not configured in environment variables")
      return
    }

    // Store original body overflow to restore later
    const originalBodyOverflow = document.body.style.overflow

    // Function to restore body scroll
    const restoreBodyScroll = () => {
      // Force restore scroll by removing overflow hidden
      document.body.style.overflow = originalBodyOverflow || ""
      
      // Also check and remove overflow hidden that Razorpay might have set
      if (document.body.style.overflow === "hidden") {
        document.body.style.overflow = ""
      }
      
      // Use setTimeout to ensure it runs after Razorpay's cleanup
      setTimeout(() => {
        if (document.body.style.overflow === "hidden") {
          document.body.style.overflow = ""
        }
        // Also check html element
        if (document.documentElement.style.overflow === "hidden") {
          document.documentElement.style.overflow = ""
        }
      }, 100)
    }

    // Opening the Razorpay SDK
    const options = {
      key: process.env.RAZORPAY_KEY,
      currency: orderResponse.data.data.currency,
      amount: `${orderResponse.data.data.amount}`,
      order_id: orderResponse.data.data.id,
      name: "StudyNotion",
      description: "Thank you for Purchasing the Course.",
      image: rzpLogo,
      prefill: {
        name: `${user_details.firstName} ${user_details.lastName}`,
        email: user_details.email,
      },
      handler: function (response) {
        restoreBodyScroll()
        sendPaymentSuccessEmail(response, orderResponse.data.data.amount, token)
        verifyPayment({ ...response, courses }, token, navigate, dispatch)
      },
      modal: {
        ondismiss: function () {
          // Handle modal close without payment
          console.log("Payment modal closed by user")
          restoreBodyScroll()
          toast.dismiss(toastId) // Dismiss the loading toast
        },
      },
    }

    try {
      const paymentObject = new window.Razorpay(options)

      // Handle payment failure
      paymentObject.on("payment.failed", function (response) {
        restoreBodyScroll()
        toast.dismiss(toastId)
        toast.error("Oops! Payment Failed.")
        console.log(response.error)
      })

      // Handle modal close event (alternative to modal.ondismiss)
      paymentObject.on("modal.close", function () {
        console.log("Payment modal closed")
        restoreBodyScroll()
        toast.dismiss(toastId) // Dismiss the loading toast
      })

      // Open the payment modal
      paymentObject.open()
    } catch (error) {
      restoreBodyScroll()
      toast.dismiss(toastId)
      console.error("Error opening Razorpay checkout:", error)
      toast.error("Failed to open payment gateway. Please try again.")
    }
  } catch (error) {
    console.log("PAYMENT API ERROR............", error)
    toast.error("Could Not make Payment.")
  }
  toast.dismiss(toastId)
}

// Verify the Payment
async function verifyPayment(bodyData, token, navigate, dispatch) {
  const toastId = toast.loading("Verifying Payment...")
  dispatch(setPaymentLoading(true))
  try {
    const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
      Authorization: `Bearer ${token}`,
    })

    console.log("VERIFY PAYMENT RESPONSE FROM BACKEND............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }

    toast.success("Payment Successful. You are Added to the course ")
    navigate("/dashboard/enrolled-courses")
    dispatch(resetCart())
  } catch (error) {
    console.log("PAYMENT VERIFY ERROR............", error)
    toast.error("Could Not Verify Payment.")
  }
  toast.dismiss(toastId)
  dispatch(setPaymentLoading(false))
}

// Send the Payment Success Email
async function sendPaymentSuccessEmail(response, amount, token) {
  try {
    await apiConnector(
      "POST",
      SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        amount,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    )
  } catch (error) {
    console.log("PAYMENT SUCCESS EMAIL ERROR............", error)
  }
}
