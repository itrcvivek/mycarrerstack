import axios from 'axios'
import { config } from 'process';

const customAxios = axios.create({
    baseURL:"https://api.stripe.com/",
    timeout:50000
})
export const tokenStr = "sk_test_51OVtVNSFkd4dZdFATY9XFTRNUHNQGRZZbygjC4Y60iy4rYoiza75EmVyn4SvKRvnV0xWWm89d8dZlEfoiR4rLu3M00Y2HX8Pqj"
export let CLIENT_SECRET = ""
export const paymentIntentApi = async () => {
    const config = { headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        "Authorization" : `Bearer ${tokenStr}`
    }}
    const data =  await customAxios.post('v1/payment_intents', 
        new URLSearchParams({
            amount:'10000',
            currency:'inr'
        }).toString(),
        config
    )
    CLIENT_SECRET = data.data.client_secret
    return data.data.client_secret;
}

export default customAxios;