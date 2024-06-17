export function GeneralBtn({ type, className, children, onClick }) {
    const getButtonClass = () => {
      switch (type) {
        case 'primary':
          return 'btn btn-primary';
        case 'secondary':
          return 'btn btn-secondary';
        case 'tertiary':
          return 'btn btn-tertiary';
        default:
          return 'btn';
      }
    };
  
    return (
      <button className={getButtonClass()} onClick={onClick}>
        {children}
      </button>
    );
  };
  