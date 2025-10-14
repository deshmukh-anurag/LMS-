import { Webhook } from "svix";
import Stripe from "stripe";  
import User from "../models/User.js";
import Course from "../models/Course.js"; 
import Purchase from "../models/Purchase.js";



const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);


// API Controller Function to Manage Clerk User with database
export const clerkWebhooks = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        })
        
        const { data, type } = req.body
        console.log(type);

        switch (type) {
            case 'user.created': {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    imageUrl: data.image_url,
                }
                console.log(userData);
                await User.create(userData)
                res.json({})
                break;
            }
            case 'user.updated': {
                const userData = {
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    imageUrl: data.image_url,
                }
                await User.findByIdAndUpdate(data.id, userData)
                res.json({})
                break;
            }
            case 'user.deleted': {
                await User.findByIdAndDelete(data.id)
                res.json({})
                break;
            }
            default:
                break;
        }
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}



const handlePaymentSuccess = async (paymentIntent) => {
    try {
        console.log("Succedding payement")
        const paymentIntentId = paymentIntent.id;
        const session = await stripeInstance.checkout.sessions.list({
            payment_intent: paymentIntentId,
        });

        if (!session.data.length) {
            console.error("No session data found for payment intent:", paymentIntentId);
            return;
        }

        const { purchaseId } = session.data[0].metadata;
        const purchaseData = await Purchase.findById(purchaseId);

        if (!purchaseData) {
            console.error("No purchase found for ID:", purchaseId);
            return;
        }

        const userData = await User.findById(purchaseData.userId);
        console.log(userData);
        const courseData = await Course.findById(purchaseData.courseId.toString());
        console.log(courseData);
        if (!userData || !courseData) {
            console.error("User or Course not found");
            return;
        }

        // Add user to enrolled students
        courseData.enrolledStudents.push(userData._id);
        await courseData.save();

        // Add course to user's enrolled courses
        userData.enrolledCourses.push(courseData._id);
        await userData.save();

        // Update purchase status
        purchaseData.paymentStatus = 'completed';
        await purchaseData.save();
    } catch (error) {
        console.error("Error handling payment success:", error);
    }
};

const handlePaymentFailed = async (paymentIntent) => {
    try {
        const paymentIntentId = paymentIntent.id;
        const session = await stripeInstance.checkout.sessions.list({
            payment_intent: paymentIntentId,
        });

        if (!session.data.length) {
            console.error("No session data found for failed payment intent:", paymentIntentId);
            return;
        }

        const { purchaseId } = session.data[0].metadata;
        const purchaseData = await Purchase.findById(purchaseId);

        if (!purchaseData) {
            console.error("No purchase found for ID:", purchaseId);
            return;
        }

        purchaseData.paymentStatus = 'failed';
        await purchaseData.save();
    } catch (error) {
        console.error("Error handling payment failure:", error);
    }
};

// Handle the event
    export const stripeWebhooks = async (request, response) => {
    console.log("Called Webhook Received")
    const sig = request.headers['stripe-signature'];

    let event;

    try {
        event = stripeInstance.webhooks.constructEvent(request.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        return response.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event

    switch (event.type) {
        case 'payment_intent.succeeded':
            await handlePaymentSuccess(event.data.object);
            break;

        case 'payment_intent.payment_failed':
            await handlePaymentFailed(event.data.object);
            break;

        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    response.json({ received: true });
};