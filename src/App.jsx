export default function App() {
  return (
    <main className="mx-auto max-w-3xl pt-10 flex flex-col items-center gap-4">
      <button className="btn btn-primary">Import Item (Ctrl + V)</button>

      <div className="flex justify-center border border-primary w-full p-1">
        <div className="flex flex-col items-end h-full p-1">
          <div className="flex h-full">
            <button className="btn btn-outline w-24 h-48">Main Hand</button>
            <div className="flex flex-col-reverse">
              <button className="btn btn-outline w-12 h-12">Left Ring</button>
            </div>
          </div>
          <button className="btn btn-outline w-24 h-24">Gloves</button>
        </div>
        <div className="flex flex-col h-full p-1">
          <button className="btn btn-outline w-24 h-24">Helmet</button>
          <button className="btn btn-outline w-24 h-32">Body Armour</button>
          <button className="btn btn-outline w-24 h-12">Belt</button>
        </div>
        <div className="flex flex-col h-full p-1">
          <div className="flex flex-row-reverse h-full">
            <button className="btn btn-outline w-24 h-48">Off Hand</button>
            <div className="flex flex-col-reverse">
              <button className="btn btn-outline w-12 h-12">Left Ring</button>
              <button className="btn btn-outline w-12 h-12">Amulet</button>
            </div>
          </div>
          <button className="btn btn-outline w-24 h-24">Boots</button>
        </div>
      </div>
    </main>
  );
} 