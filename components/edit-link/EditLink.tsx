import { useCMS } from 'tinacms'

export const EditLink = ({className}) => {
  const cms = useCMS();
  return (
    <button onClick={() => cms.toggle()}  className={className}>
      {cms.enabled ? 'Exit Edit Mode' : 'Edit This Site'}
    </button>
  )
}