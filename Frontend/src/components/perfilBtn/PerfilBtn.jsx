export function PerfilBtn({ className, children, onClick }) {
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
}
