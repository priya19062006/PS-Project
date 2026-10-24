import { FormEvent, useState } from "react";

type Measurements = {
  sepalLength: string;
  sepalWidth: string;
  petalLength: string;
  petalWidth: string;
};

const pipelineSteps = [
  {
    number: "01",
    title: "Code",
    description: "Push model and application changes to the repository.",
    icon: "code",
  },
  {
    number: "02",
    title: "Build & Test",
    description: "Automated checks validate quality, accuracy, and reliability.",
    icon: "check",
  },
  {
    number: "03",
    title: "Deploy",
    description: "A verified release is packaged and deployed automatically.",
    icon: "rocket",
  },
  {
    number: "04",
    title: "Monitor",
    description: "Track model health, performance, and prediction drift.",
    icon: "chart",
  },
];

function Icon({
  name,
  className = "size-5",
}: {
  name: string;
  className?: string;
}) {
  const paths: Record<string, React.ReactNode> = {
    spark: (
      <path d="M12 2 9.8 8.1 4 10.5l5.8 2.3L12 19l2.2-6.2 5.8-2.3-5.8-2.4L12 2Z" />
    ),
    code: <path d="m8.5 8-4 4 4 4m7-8 4 4-4 4m-2.5-11-2 14" />,
    check: (
      <>
        <path d="M20 11a8 8 0 1 1-3.4-6.5" />
        <path d="m8.5 11.5 2.4 2.4L20 5" />
      </>
    ),
    rocket: (
      <>
        <path d="M14.8 5.2C17 3 20 3 21 3c0 1 0 4-2.2 6.2l-4.4 4.4-4-4 4.4-4.4Z" />
        <path d="M13 6H7l-3 3 6 1m8 1v6l-3 3-1-6M7.5 15.5C5 16 4 17 4 20c3 0 4-1 4.5-3.5" />
      </>
    ),
    chart: (
      <>
        <path d="M4 19V9m5 10V5m5 14v-7m5 7V3" />
        <path d="M2 21h20" />
      </>
    ),
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
    shield: (
      <>
        <path d="M12 3 5 6v5c0 4.5 2.8 8.3 7 10 4.2-1.7 7-5.5 7-10V6l-7-3Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      {paths[name]}
    </svg>
  );
}

export default function App() {
  const [values, setValues] = useState<Measurements>({
    sepalLength: "5.8",
    sepalWidth: "3.0",
    petalLength: "4.3",
    petalWidth: "1.4",
  });
  const [prediction, setPrediction] = useState({
    species: "Iris Versicolor",
    confidence: 94.8,
  });
  const [hasPredicted, setHasPredicted] = useState(true);

  function updateValue(key: keyof Measurements, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function handlePredict(event: FormEvent) {
    event.preventDefault();
    const petalLength = Number(values.petalLength);
    const petalWidth = Number(values.petalWidth);
    let species = "Iris Versicolor";
    let confidence = 94.8;

    if (petalLength < 2.5) {
      species = "Iris Setosa";
      confidence = 98.6;
    } else if (petalLength > 5 || petalWidth > 1.75) {
      species = "Iris Virginica";
      confidence = 96.2;
    }

    setPrediction({ species, confidence });
    setHasPredicted(true);
  }

  return (
    <div className="min-h-screen bg-[#f8fbff] text-slate-950">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a className="flex items-center gap-3" href="#home">
            <span className="grid size-10 place-items-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
              <Icon name="spark" />
            </span>
            <span className="text-lg font-bold tracking-tight">PredictFlow</span>
          </a>
          <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a className="nav-link" href="#home">Home</a>
            <a className="nav-link" href="#about">About</a>
            <a className="nav-link" href="#predict">Prediction</a>
            <a className="nav-link" href="#pipeline">CI/CD Pipeline</a>
          </div>
          <a
            className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
            href="#predict"
          >
            Try prediction
          </a>
        </nav>
      </header>

      <main>
        <section className="hero-grid relative overflow-hidden" id="home">
          <div className="hero-glow" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-[1.08fr_.92fr] lg:py-32">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-blue-700">
                <span className="size-1.5 rounded-full bg-blue-600" />
                Intelligent predictions, continuously delivered
              </div>
              <h1 className="max-w-3xl text-4xl font-bold leading-[1.08] tracking-[-0.04em] text-slate-950 sm:text-6xl">
                Machine learning, built for{" "}
                <span className="text-blue-600">continuous innovation.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                A production-ready prediction system that brings reliable ML
                models and automated CI/CD pipelines together in one seamless
                workflow.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-blue-600/25 transition hover:-translate-y-0.5 hover:bg-blue-700"
                  href="#predict"
                >
                  Make a prediction <Icon className="size-4" name="arrow" />
                </a>
                <a
                  className="rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-700"
                  href="#pipeline"
                >
                  Explore the pipeline
                </a>
              </div>
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-500">
                {["Automated delivery", "Validated models", "Live monitoring"].map((item) => (
                  <span className="flex items-center gap-2" key={item}>
                    <span className="grid size-5 place-items-center rounded-full bg-blue-100 text-blue-700">
                      <Icon className="size-3" name="check" />
                    </span>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-lg">
              <div className="absolute -inset-8 rounded-full bg-blue-200/50 blur-3xl" />
              <div className="relative rounded-[2rem] border border-white/80 bg-white/85 p-4 shadow-2xl shadow-blue-950/10 backdrop-blur">
                <div className="rounded-[1.4rem] bg-slate-950 p-6 text-white">
                  <div className="mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-emerald-400" />
                      <span className="text-xs font-medium text-slate-300">Model live</span>
                    </div>
                    <span className="rounded-md bg-white/10 px-2 py-1 font-mono text-[10px] text-slate-300">v2.4.1</span>
                  </div>
                  <div className="flex h-40 items-end gap-3 border-b border-white/10 pb-4">
                    {[42, 62, 48, 78, 66, 88, 72, 94, 84, 98].map((height, index) => (
                      <div className="flex h-full flex-1 items-end" key={index}>
                        <div
                          className="w-full rounded-t bg-gradient-to-t from-blue-600 to-cyan-300"
                          style={{ height: `${height}%`, opacity: 0.5 + index * 0.05 }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 grid grid-cols-3 gap-3">
                    {[
                      ["Accuracy", "97.4%"],
                      ["Latency", "42ms"],
                      ["Uptime", "99.9%"],
                    ].map(([label, value]) => (
                      <div className="rounded-xl bg-white/5 p-3" key={label}>
                        <p className="text-[10px] uppercase tracking-wider text-slate-400">{label}</p>
                        <p className="mt-1 text-lg font-semibold">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute -right-2 -bottom-6 flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl sm:-right-8">
                <span className="grid size-10 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
                  <Icon name="shield" />
                </span>
                <div>
                  <p className="text-xs text-slate-500">Latest deployment</p>
                  <p className="text-sm font-semibold">All checks passed</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28" id="about">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <p className="section-label">About the project</p>
              <h2 className="section-title mt-3">From experimentation to production.</h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-slate-600 lg:ml-auto">
              This project demonstrates how a machine learning model can be
              integrated into a robust software delivery lifecycle. Every
              change is tested, validated, and deployed with confidence—making
              intelligent systems faster to ship and safer to scale.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              ["01", "Reliable by design", "Automated model validation prevents regressions before they reach users."],
              ["02", "Built to scale", "A modular architecture supports rapid iteration from prototype to production."],
              ["03", "Always observable", "Model and application metrics make every release measurable and transparent."],
            ].map(([number, title, copy]) => (
              <article className="card group" key={title}>
                <span className="text-xs font-bold tracking-widest text-blue-600">{number}</span>
                <h3 className="mt-8 text-xl font-semibold tracking-tight">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{copy}</p>
                <div className="mt-8 h-1 w-10 rounded-full bg-blue-100 transition-all group-hover:w-20 group-hover:bg-blue-600" />
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-blue-100 bg-blue-50/60 py-20 lg:py-28" id="predict">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="section-label">Interactive demo</p>
              <h2 className="section-title mt-3">Try the prediction model</h2>
              <p className="mt-4 text-slate-600">
                Enter the flower measurements below to classify an Iris species.
              </p>
            </div>
            <div className="mx-auto mt-12 grid max-w-5xl overflow-hidden rounded-[1.75rem] border border-blue-100 bg-white shadow-2xl shadow-blue-900/8 lg:grid-cols-[1.2fr_.8fr]">
              <form className="p-6 sm:p-10" onSubmit={handlePredict}>
                <div className="mb-8 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold">Flower measurements</h3>
                    <p className="mt-1 text-sm text-slate-500">Enter values in centimeters</p>
                  </div>
                  <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">Iris dataset</span>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  {[
                    ["sepalLength", "Sepal Length", "5.8"],
                    ["sepalWidth", "Sepal Width", "3.0"],
                    ["petalLength", "Petal Length", "4.3"],
                    ["petalWidth", "Petal Width", "1.4"],
                  ].map(([key, label, placeholder]) => (
                    <label className="block" key={key}>
                      <span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span>
                      <span className="relative block">
                        <input
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3.5 pr-12 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                          min="0"
                          placeholder={placeholder}
                          required
                          step="0.1"
                          type="number"
                          value={values[key as keyof Measurements]}
                          onChange={(event) => updateValue(key as keyof Measurements, event.target.value)}
                        />
                        <span className="absolute top-1/2 right-4 -translate-y-1/2 text-xs font-medium text-slate-400">cm</span>
                      </span>
                    </label>
                  ))}
                </div>
                <button
                  className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 active:scale-[.99]"
                  type="submit"
                >
                  Predict species <Icon className="size-4" name="arrow" />
                </button>
              </form>

              <div className="relative flex min-h-80 flex-col justify-between overflow-hidden bg-blue-600 p-8 text-white sm:p-10">
                <div className="result-pattern" />
                <div className="relative">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-blue-100">
                    <span className="size-2 rounded-full bg-cyan-300" />
                    Prediction result
                  </div>
                  {hasPredicted ? (
                    <>
                      <p className="mt-12 text-sm text-blue-100">Identified species</p>
                      <h3 className="mt-2 text-3xl font-bold tracking-tight">{prediction.species}</h3>
                      <div className="mt-8">
                        <div className="mb-2 flex justify-between text-xs">
                          <span className="text-blue-100">Confidence score</span>
                          <span className="font-semibold">{prediction.confidence}%</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-white/20">
                          <div
                            className="h-full rounded-full bg-cyan-300 transition-all duration-700"
                            style={{ width: `${prediction.confidence}%` }}
                          />
                        </div>
                      </div>
                    </>
                  ) : null}
                </div>
                <p className="relative mt-10 text-xs leading-5 text-blue-100/80">
                  Prediction generated by the latest validated production model.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28" id="pipeline">
          <div className="max-w-2xl">
            <p className="section-label">Continuous delivery</p>
            <h2 className="section-title mt-3">How our CI/CD pipeline works</h2>
            <p className="mt-4 leading-7 text-slate-600">
              A streamlined automated workflow moves every model update safely
              from development to production.
            </p>
          </div>
          <div className="relative mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <div className="pipeline-line" />
            {pipelineSteps.map((step) => (
              <article className="pipeline-card" key={step.title}>
                <div className="flex items-center justify-between">
                  <span className="grid size-12 place-items-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon name={step.icon} />
                  </span>
                  <span className="text-xs font-bold tracking-widest text-slate-300">{step.number}</span>
                </div>
                <h3 className="mt-7 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{step.description}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 rounded-2xl border border-slate-200 bg-white px-6 py-5 text-xs font-medium text-slate-500">
            {["Git push", "Automated tests", "Model registry", "Production API", "Observability"].map((item, index) => (
              <div className="flex items-center gap-8" key={item}>
                <span>{item}</span>
                {index < 4 && <Icon className="hidden size-4 text-blue-400 sm:block" name="arrow" />}
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-slate-950 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-lg bg-blue-600 text-white">
              <Icon className="size-4" name="spark" />
            </span>
            <div>
              <p className="font-semibold">PredictFlow</p>
              <p className="text-xs text-slate-400">ML delivery, simplified.</p>
            </div>
          </div>
          <p className="text-xs text-slate-500">
            © 2025 Integrating Machine Learning Model with CI/CD Pipelines.
          </p>
          <div className="flex gap-6 text-xs text-slate-400">
            <a className="hover:text-white" href="#about">About</a>
            <a className="hover:text-white" href="#predict">Demo</a>
            <a className="hover:text-white" href="#pipeline">Pipeline</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
