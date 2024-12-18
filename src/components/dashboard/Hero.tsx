import TypewriterEffect from "../TypewriterEffect";

type HeroProps = {
  appName: string;
  workPlace: string;
  observerRef: React.LegacyRef<HTMLDivElement>
}

export default function Hero(
  {
    appName, workPlace, observerRef,
  }: HeroProps
) {
  return (
    <section 
    ref={observerRef}
    className='text-base flex flex-col justify-center md:p-6 md:m-auto gap-y-5 h-[87vh] pt14'
      id='home'
    >
      <div className='midScreen:leading-[3rem] leading-[3.5rem] tracking-wide font-mono text-cyan-200 text-xl'>
        <TypewriterEffect text="Hello world, my name is..." start="BEGIN" delay={0.4} />
      </div>
      <article className="fluid-text transition-transform flex flex-col gap-y-4">
        <p className="text-blue-50 tracking-wide font-bold mobile:text-3xl">{appName}.</p>

        <p className="text-slate-400 font-bold mobile:text-3xl">I transform complex problems into elegant solutions.</p>
      </article>

      <p className="text-slate-300 tracking-wide leading-7">
        I'm a software developer specializing in building web applications and application servers. Presently building user centered applications and services at <span className="text-[#a5f3fc]">{workPlace}</span> and I'm committed to delivering high-quality solutions.
      </p>
    </section>
  )
}