import { Linking } from 'react-native';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export function checkout(planId: number, customerId: string) {
  fetch(`${BASE_URL}/create-checkout-link`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      planId,
      customerId,
    }),
  })
    .then((res) => res.json())
    .then(({ url }) => Linking.openURL(url))
    .catch(console.error);
}

export function manageSubscription(customerId: string) {
  fetch(`${BASE_URL}/create-billing-portal-link`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ customerId }),
  })
    .then((res) => res.json())
    .then(({ url }) => Linking.openURL(url))
    .catch(console.error);
}
