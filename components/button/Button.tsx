import Link from 'next/link';

export default function Button({ colour = 'primary', size = 'md', type = 'submit', href, children, ...rest }) {
  const sizes = {
    xl: "text-3xl px-3 py-2",
    lg: "text-xl px-3 py-2",
    md: "px-2 py-1",
    sm: "px-2 py-1"
  }
  const colours = {
    primary: "bg-brand-800 hover:bg-brand-600 text-white",
    secondary: "bg-brand-500 hover:bg-brand-700 text-white"
  }
  const standardStyles = "self-start mt-4 rounded transition-color duration-500 hover:text-opacity-90";

  if (type === 'link') {
    return (
      <span className={`${sizes[size]} ${colours[colour]} ${standardStyles}`}>
        <Link
          href={href}
          {...rest}
        >
          {children}
        </Link>
      </span>
    )
  } if (type === 'submit' || type === 'reset') {
    return (
      <input
        type={type}
        className={`${sizes[size]} ${colours[colour]} ${standardStyles}`}
        value={children}
      />
    )
  }
  return (
    <button
      type={type}
      className={`${sizes[size]} ${colours[colour]} ${standardStyles}`}
      {...rest}
    >
      {children}
    </button>
  )
}