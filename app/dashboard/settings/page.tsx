export default function SettingsPage() {
  return (
    <div className="p-6 lg:p-10 max-w-2xl mx-auto">
      <h1 className="font-display text-2xl text-teal-950 mb-2">Settings</h1>
      <p className="text-sm text-ink-soft mb-8">Profile and notification preferences.</p>
      <div className="space-y-4">
        <label className="block text-sm font-medium">
          Display name
          <input className="mt-1.5 w-full border border-line rounded-lg px-3 py-2 text-sm" placeholder="Maria Santos" />
        </label>
      </div>
    </div>
  );
}
