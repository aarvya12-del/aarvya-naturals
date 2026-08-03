// Server-side Firebase Admin setup — used to verify that a request
// to sensitive API routes (like refunds) genuinely comes from a
// logged-in admin, not just anyone who knows the URL.
//
// Needs 3 new env vars (see the setup instructions in the response
// this file was shared with) — get these from:
// Firebase Console → Project Settings → Service Accounts → Generate new private key

import { getApps, initializeApp, cert, App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

let adminApp: App;

if (!getApps().length) {
  adminApp = initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      // Vercel env vars store newlines as literal "\n" text — this
      // converts them back to real newlines, which the key needs.
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
} else {
  adminApp = getApps()[0];
}

export const adminAuth = getAuth(adminApp);
