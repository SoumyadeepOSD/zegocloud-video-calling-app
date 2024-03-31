const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);


export async function sendsms(mobileNumber: string, message: string) {
    try {
        const res = await client.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: `+91${mobileNumber}`
        });
        console.log(res.sid);
    } catch (error) {
        console.log(error);
    }
}

