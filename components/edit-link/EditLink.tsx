import { useCMS } from 'tinacms'

export const EditLink = () => {
  const cms = useCMS()
  const handleClick = () => {
    if (!cms.enabled) {
      alert(`Some of the site layout may appear unusual in edit mode. Once you have finished editing, save and exit to see the site with the proper layout.`);
    }
    cms.toggle();
  }
  return (
    <button onClick={handleClick}>
      {cms.enabled ? 'Exit Edit Mode' : 'Edit This Site'}
    </button>
  )
}