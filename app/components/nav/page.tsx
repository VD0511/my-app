export default function Navbar() {
  return (
    <div className="bg-black min-h-screen p-10">
      
      {/* Navbar */}
      <nav className="max-w-5xl mx-auto border border-gray-700 rounded-2xl px-6 py-4 bg-zinc-900 shadow-2xl">
        
        <div className="flex items-center justify-between">
          
          {/* Name */}
          <div className="border border-cyan-500 px-5 py-2 rounded-lg bg-cyan-500/10">
            <h1 className="text-white font-semibold text-lg">
              Vishal
            </h1>
          </div>

          {/* Profile */}
          <div className="flex items-center gap-3">
            
            <div className="text-right hidden sm:block">
              <p className="text-white font-medium">
                Vishal Dixit
              </p>

              <p className="text-gray-400 text-sm">
                Developer
              </p>
            </div>

            <img
              src="https://i.pravatar.cc/100"
              alt="profile"
              className="w-12 h-12 rounded-full border-2 border-cyan-400 object-cover cursor-pointer hover:scale-110 transition duration-300"
            />
          </div>

        </div>
      </nav>
    </div>
  );
}