export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0b0d] px-4 pb-12 pt-32">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#111318] p-8">
        {children}
      </div>
    </div>
  );
}
