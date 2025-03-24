type SingleWorkBodyProps = {
  content: JSX.Element;
};

export default async function SingleWorkBody({ content }: SingleWorkBodyProps) {
  return (
    <div className="container mt-32 bg-background pb-40 pt-32 shadow-[0_0_2px_0px_rgba(0,0,0,0.1)] dark:bg-d-background dark:shadow-[0_0_2px_0px_rgba(255,255,255,0.1)]">
      <div className="container-text">{content}</div>
    </div>
  );
}
