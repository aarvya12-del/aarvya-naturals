"use client";

import { useAuth } from "@/context/AuthContext";
import { ADMIN_EMAILS } from "@/config/admin";

/**
 * Returns whether the currently logged-in user is an admin,
 * plus loading state so pages can show a spinner instead of
 * flashing content before the check resolves.
 *
 * NOTE: this is a UI-level gate only. It hides/shows admin
 * pages in the browser, but it does NOT by itself stop someone
 * from calling Firestore directly and editing orders/products.
 * Real protection has to come from your Firestore security
 * rules (see firestore.rules.txt) — this hook and the rules
 * must both check the same admin list.
 */
export function useAdminAuth() {
  const { user, loading } = useAuth();

  const isAdmin =
    !loading &&
    !!user?.email &&
    ADMIN_EMAILS.includes(user.email);

  return {
    isAdmin,
    loading,
    user,
  };
}
