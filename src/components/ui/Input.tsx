interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Input({ className = '', ...props }: InputProps) {
  return (
    <div className="relative w-full group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition duration-500"></div>
      <input 
        className={`relative w-full pl-6 pr-4 py-4 rounded-2xl bg-gray-800/80 border border-white/10 text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all ${className}`}
        {...props}
      />
    </div>
  );
}