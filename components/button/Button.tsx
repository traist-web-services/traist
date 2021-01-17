import Link from 'next/link';

enum Colours {
  "primary" = "primary",
  "secondary" = "secondary"
}

enum Sizes {
  "xl" = "xl",
  "lg" = "lg",
  "md" = "md",
  "sm" = "sm"
}

enum Types {
  "submit" = "submit",
  "reset" = "reset",
  "link" = "link"
}

interface ButtonInterface {
  colour?: Colours,
  size?: Sizes,
  type: Types,
  href: String,
  children: React.ReactNode
}

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
      <span className={`${sizes[Sizes[size]]} ${colours[Colours[colour]]} ${standardStyles}`}>
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
        type={Types[type]}
        className={`${sizes[Sizes[size]]} ${colours[Colours[colour]]} ${standardStyles}`}
        value={children}
      />
    )
  }
  return (
    <button
      type={Types[type]}
      className={`${sizes[Sizes[size]]} ${colours[Colours[colour]]} ${standardStyles}`}
      {...rest}
    >
      {children}
    </button>
  )
}