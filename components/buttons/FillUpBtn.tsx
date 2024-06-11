type FillUpBtnProps = {
  children: React.ReactNode;
  onClick: () => void;
};

export default function FillUpBtn({ children, onClick }: FillUpBtnProps) {
  return (
    <button type="button" className="block rounded-xl bg-primary px-4 py-2 text-white" onClick={onClick}>
      {children}
    </button>
  );
}
