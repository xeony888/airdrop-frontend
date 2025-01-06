import HomeForm from "@/components/HomeForm";

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-center overflow-hidden bg-[#050506]">
      <img
        src="/images/bg.png"
        className="absolute inset-0 z-0 w-full object-cover mix-blend-soft-light"
        alt="Background"
      />
      <div className="container relative flex flex-col items-center justify-center py-[60px]">
        <div className="w-full max-w-3xl bg-[#28282B] px-10 pb-5 pt-10 md:rounded-2xl">
          <HomeForm />
        </div>
      </div>
    </main>
  );
}
