
export default function Experience() {

  const workPlaces = ['Devheit', 'USAF', 'Resavation'];

  return (
    <section
      id='experience'
      className=" h[87vh] pt-10 pb-20 mb-0 flex flex-col gap-y-6 bg-red-00"
    >
    
      <div className="border-b-2 border-b-slate-600 text-slate-400 flex items-center justify-between">
        {
          workPlaces.map((place) => (
            <button
            className="capitalize hover:text-cyan-300 hover:bg-slate-800 px5 h-9 sm:w-28 w-24 focus:text-cyan-300 focus:outline-none ring-0 transition-colors focus:border-b-2 border-b-cyan-300 border-separate"
            key={place}
            >
              {place}
            </button>
          ))
        }
      </div>
      <div className='text-slate-300 text-base flex flex-col md:p-6 md:m-auto gap-y-5'>
        <p className="tracking-wide leading-7">
          I'm Oluwatobi Akinola, a software developer who loves turning complex problems into elegant solutions. I would love to be part of your community to impact lives and make technology easier and safer to us.
        </p>

        <p>
          I create smooth user friendly interfaces, provide excellent server-side and client-side logic, smooth integration of web applications with APIs and external libraries, excellent at providing client-side and server-side authentication and application security.
        </p>

        <p>
          I'm a great team player and I also excel as a standalone. When it comes to transforming designs into real world apps, I pay close attention to details and also input my contributions where necessary.
        </p>
      </div>

      {/* <div className='mt-4 text-slate-300 text-base flex flex-col md:p-6 md:m-auto gap-y-5'>
        <p>Here are few technologies I've worked with</p>

        <ol className="grid grid-cols-2 gap-1 w-full relative justify-between">
          {
            technologies.map((tech) => (
              <li key={tech}
                className="w-fit whitespace-nowrap flex items-center gap-x-2 font-mono text-gray-400 last:absolute last:-bottom-7"
              >
                <MdOutlineArrowRight className="text-cyan-500 text-xl" />
                {tech}
              </li>
            ))
          }
        </ol>
      </div> */}
    </section>
  )
}