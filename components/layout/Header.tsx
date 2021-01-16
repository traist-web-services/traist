export default function Header() {
  return (
    <header class="flex-grow-0 border-b-4 border-brand-500 bg-white w-full z-10">
      <nav
        class="text-2xl lowercase flex justify-between text-brand-500 py-4 px-4 md:px-24"
      >
        <a class="font-bold" href="/">Traist Web Services</a>
        <div>
          <ul class="flex text-brand-400">
            <li>
              Menu Item 1
          </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

