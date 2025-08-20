import React from "react";
import Landing from "@/features/home/components/landing";
import { clerkClient } from "@clerk/nextjs/server";

export default async function Page() {
  const client = await clerkClient();
  const { totalCount } = await client.waitlistEntries.list();

  return <Landing totalCount={totalCount} />;
}
