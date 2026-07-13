export default function Button({ children, variant = 'primary', size = 'md', block = false, className = '', ...props }) {
  const baseClass = 'btn';
  const variantClass = `btn-${variant}`;
  const sizeClass = size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : '';
  const blockClass = block ? 'btn-block' : '';
  return (
    <button className={`${baseClass} ${variantClass} ${sizeClass} ${blockClass} ${className}`} {...props}>
      {children}
    </button>
  );
}
