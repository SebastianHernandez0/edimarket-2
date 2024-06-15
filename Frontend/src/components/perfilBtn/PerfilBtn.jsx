export function PerfilBtn({ className, children, onClick, type }) {
  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );
}
