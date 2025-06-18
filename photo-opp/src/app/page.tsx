import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="h-screen w-full flex flex-col justify-between bg-white items-center bg-gradient-to-br from-zinc-100 to-zinc-300 p-8">
      <div className="w-full flex justify-start">
        <Image
          src="/nextlab.svg"
          alt="Logo NEX"
          width={100}
          height={100}
          priority
        />
      </div>

      <div className="flex flex-col items-center gap-4 mt-[-80px] max-w-[640px]">
        <h1 className="text-5xl md:text-[100px] font-bold text-black text-center">Photo Opp</h1>
      </div>

      <Link href="/capture" className="w-full flex justify-center">
        <button className="bg-[#606060] w-full md:w-[956px] cursor-pointer text-white md:text-[56px] font-bold py-4 px-5 md:py-8 md:px-10 hover:brightness-90">
          Iniciar
        </button>
      </Link>
    </main>
  )
}
