export default function InfoBox({ children, type = 'info' }) {
  return <div className={`${type === 'warning' ? 'warning-box' : 'info-box'}`}>{children}</div>;
}
