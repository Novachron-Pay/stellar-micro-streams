export default function Dashboard() {
  const [balance, setBalance] = React.useState(0);
  const [flowRate, setFlowRate] = React.useState(0);
  const [elapsedSeconds, setElapsedSeconds] = React.useState(0);

  useStreamAnimation(baseBalance, flowRate);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 100);

    return () => clearInterval(interval);
  }, [flowRate]);

  const currentDisplay = baseBalance + (elapsedSeconds * flowRate);
  setBalance(currentDisplay);

  return (
    <main>
      <header className="flex justify-between items-center mb-12 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Nova Pay</h1>
          <p className="text-zinc-500 mt-1">Continuous Web3 Payroll & Streaming</p>
        </div>
        <button className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-zinc-200 transition-colors">
          Connect Wallet
        </button>
      </header>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Active Streams</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-red-400 bg-red-500/10 px-2 py-1 rounded">Outgoing</span>
                <p className="text-sm text-zinc-400 mt-2">To: GB7X...9A2P</p>
              </div>
              <button className="text-sm text-zinc-500 hover:text-white transition-colors">Cancel</button>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-mono">-{balance.toFixed(2)}</span>
              <span className="text-zinc-500 mb-1">USDC / month</span>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">Incoming</span>
                <p className="text-sm text-zinc-400 mt-2">From: GAC3...R5T1</p>
              </div>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-mono text-emerald-400">+{balance.toFixed(2)}</span>
              <span className="text-zinc-500 mb-1">USDC / month</span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
        <h3 className="text-lg font-semibold mb-4">Create New Stream</h3>
        <div className="flex gap-4">
          <input type="text" placeholder="Recipient Address (G...)" className="bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 flex-1 outline-none focus:border-blue-500 transition-colors" />
          <input type="number" placeholder="USDC / month" className="bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 w-48 outline-none focus:border-blue-500 transition-colors" />
          <button disabled className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg opacity-50 cursor-not-allowed">Start Stream</button>
        </div>
      </section>
    </main>
  );
}
