"use client";

import { useRouter } from "next/navigation";
import { Heart } from "@/components/Icons";
import { useAuth } from "@/context/AuthContext";
import { useWishlist, WishlistItemType } from "@/context/WishlistContext";

export default function WishlistHeartButton({
  slug,
  type,
  className = "absolute right-4 top-4",
}: {
  slug: string;
  type: WishlistItemType;
  className?: string;
}) {
  const { user } = useAuth();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const router = useRouter();

  const wishlisted = isWishlisted(slug, type);

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      router.push("/login");
      return;
    }

    toggleWishlist(slug, type);
  }

  return (
    <button
      onClick={handleClick}
      aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
      className={`flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-110 ${className}`}
    >
      <Heart
        size={20}
        className={wishlisted ? "text-red-500" : "text-gray-400"}
        fill={wishlisted ? "currentColor" : "none"}
      />
    </button>
  );
}
