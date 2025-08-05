function Title({ title , className}) {
  return (
    <h2 className={`text-[32px] lg:text-[48px] font-cairo font-bold  pb-8 ${className}`}>
      {title}
    </h2>
  );
}

export default Title;
