import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { CheckoutForm } from "@/components/storefront/CheckoutForm";

export default async function CheckoutPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login?callbackUrl=/checkout");
  }

  const user = await db.user.findUnique({ where: { id: session.user.id } });

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-xl font-semibold text-neutral-900">
        Buyurtmani rasmiylashtirish
      </h1>
      <CheckoutForm defaultPhone={user?.phone ?? ""} />
    </div>
  );
}
