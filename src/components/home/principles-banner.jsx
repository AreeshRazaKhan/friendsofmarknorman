import { PRINCIPLES } from '@/constants/site'

const PrinciplesBanner = () => {
  return (
    <section className="relative overflow-hidden bg-navy text-paper">
      <div
        className="bg-stripe pointer-events-none absolute inset-0 opacity-25"
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16 lg:px-10">
        <div>
          <p className="eyebrow text-red-3">Principles</p>
          <h2 className="display mt-4 text-4xl text-paper sm:text-5xl">
            Six rules. <em>One campaign.</em>
          </h2>
          <p className="mt-4 max-w-prose text-paper-78">
            Every decision in this campaign — from a yard sign on a country road to a hero on the
            website — answers to the same six principles.
          </p>
        </div>

        <ul className="flex flex-col items-start gap-1 font-sans text-2xl font-bold tracking-tighter text-paper sm:text-3xl lg:items-end lg:text-right">
          {PRINCIPLES.map((line, idx) => (
            <li
              key={line}
              className={
                idx === 1 || idx === 4 ? 'font-normal italic text-red-3' : ''
              }
            >
              {line}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default PrinciplesBanner
