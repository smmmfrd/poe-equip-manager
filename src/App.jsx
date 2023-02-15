export default function App() {
  return (
    <main className="mx-auto max-w-2xl pt-10 flex flex-col items-center gap-4">
      <button className="btn btn-primary">Import Item (Ctrl + V)</button>

      <div className="grid grid-cols-8 grid-rows-6 gap-4 [&>*]:w-16 [&>*]:h-16">
        <div className="">
          <button className="btn btn-outline w-double h-quad">
            Main Hand
          </button>
        </div>
        <div className="col-start-4">
          <button className="btn btn-outline w-double h-double">
            Helmet
          </button>
        </div>
        <div className="col-start-7">
          <button className="btn btn-outline w-double h-quad">
            Off Hand
          </button>
        </div>
        <div className="row-start-3 col-start-4">
          <button className="btn btn-outline w-double h-triple">
            Body Armour
          </button>
        </div>
        <div className="row-start-3 col-start-6">
          <button className="btn btn-outline w-full h-full">
            Amulet
          </button>
        </div>
        <div className="row-start-4 col-start-3">
          <button className="btn btn-outline w-full h-full">
            Ring
          </button>
        </div>
        <div className="row-start-4 col-start-6">
          <button className="btn btn-outline w-full h-full">
            Ring
          </button>
        </div>
        <div className="row-start-5 col-start-2">
          <button className="btn btn-outline w-double h-double">
            Gloves
          </button>
        </div>
        <div className="row-start-5 col-start-6">
          <button className="btn btn-outline w-double h-double">
            Boots
          </button>
        </div>
        <div className="row-start-6 col-start-4">
          <button className="btn btn-outline w-double h-full">
            Belt
          </button>
        </div>
      </div>

      <div className="bg-success"></div>
      <div className=""></div>
      <div className="bg-error"></div>
    </main>
  );
} 