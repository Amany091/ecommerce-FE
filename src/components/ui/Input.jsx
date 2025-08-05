function Input({ inputLabel, inputLabelId, type, placeholder, styles, change, blur, value, inputName }) {

  return (
    <>
      <label htmlFor={inputLabelId} className="block mb-2 text-placeholderColor">{inputLabel}</label>
      <input type={type} id={inputLabelId} placeholder={placeholder} className={`block py-3 px-4 rounded-lg bg-inputBackground border-none dark:text-black ${styles}`} onChange={change} onBlur={blur} value={value} name={inputName} />
    </>
  )
}

export default Input
