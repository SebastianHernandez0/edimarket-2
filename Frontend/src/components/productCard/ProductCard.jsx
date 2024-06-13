export function ProductCard({ children, className, onClick }) {
  return (
    <div onClick={onClick} className={className}>
      {children}
    </div>
  );
}
