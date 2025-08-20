import { Waitlist } from "@clerk/nextjs";

export default function WaitlistPage() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <Waitlist
        appearance={{
          elements: {
            footer: { display: "none" },
          },
        }}
      />
    </main>
  );
}
